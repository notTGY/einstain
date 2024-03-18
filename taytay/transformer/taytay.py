import torch
import time
import torch.nn as nn

M = ['~', '$', ' ', '\n', '\'', ',']
for i in range(26):
    M.append(chr(ord('a') + i))
vocab_size = len(M)

def tokenize(str):
  tokens = []
  for char in str:
      index = M.index(char) if char in M else 1
      tokens.append(index)
  return tokens

def untokenize(ids):
  chars = []
  id_list = ids.tolist()
  for idx in id_list:
      char = M[idx]
      chars.append(char)
  return ''.join(chars)

def token_to_vec(token):
  out = torch.zeros(vocab_size)
  out[token] = 1.
  return out

def tokens_to_vecs(tokensArrays):
  return torch.stack([torch.stack([token_to_vec(token) for token in tokens]) for tokens in tokensArrays])

class PositionalEncoding(nn.Module):

    def __init__(self, d_model, max_len = 5000):
        super().__init__()

        position = torch.arange(max_len).unsqueeze(1)
        div_term = torch.arange(0, d_model, 2) / 2 + 1
        pe = torch.zeros(max_len, 1, d_model)
        pe[:, 0, 0::2] = torch.sin(position * div_term)
        pe[:, 0, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe)

    def forward(self, x):
        """
        Arguments:
            x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
        """
        x = x + self.pe[:x.size(0)]
        return x

class MaskedSelfAttention(nn.Module):

  def __init__(self, key_dim=64, embedding_dim=128):
    super().__init__()
    query_dim = key_dim
    value_dim = embedding_dim
    self.K = nn.Linear(embedding_dim, key_dim, bias=False)
    self.Q = nn.Linear(embedding_dim, query_dim, bias=False)
    self.V = nn.Linear(embedding_dim, value_dim, bias=False)
    self.softmax = nn.Softmax(dim=2)

  def forward(self, x):
    """
    Arguments:
        x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
    """
    key = self.K(x)
    query = self.Q(x)
    value = self.V(x)

    scores = torch.matmul(query, torch.tril(key.transpose(1, 2)))

    scores = self.softmax(scores)
    return torch.matmul(scores, value)

class FFN(nn.Module):

    def __init__(self, dim=2, n_layers=1):
        super().__init__()
        self.n_hidden_layers = n_layers
        self.hidden_fc = nn.ModuleList([nn.Linear(dim, dim) for i in range(n_layers)])

    def forward(self, x):
        """
        Arguments:
            x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
        """
        for i in range(self.n_hidden_layers):
            x = self.hidden_fc[i](x)
            x = torch.relu(x)
        return x

class StackedAttention(nn.Module):

    def __init__(self, key_dim=2, embedding_dim=8, n_layers=1, do_norm=False):
        super().__init__()
        self.norm = None
        if do_norm is True: self.norm = nn.LayerNorm(embedding_dim)
        self.msas = nn.ModuleList([MaskedSelfAttention(key_dim=key_dim, embedding_dim=embedding_dim) for i in range(n_layers)])
    def forward(self, x):
        """
        Arguments:
            x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
        """
        residual = x
        for msa in self.msas:
            if self.norm is not None: x = self.norm(x)
            x = msa(x) + residual
            residual = x
        return x

class TayTay(nn.Module):

    def __init__(self, embedding_dim=2, key_dim=2, logging=False, msa_layers=1, ffn_layers=0):
        super().__init__()
        self.emb = nn.Linear(vocab_size, embedding_dim, bias=False)
        self.positional_encoding = PositionalEncoding(d_model=embedding_dim)
        self.msa = StackedAttention(key_dim=key_dim, embedding_dim=embedding_dim, n_layers=msa_layers)
        self.ffn = FFN(dim=embedding_dim, n_layers=ffn_layers)
        self.fc = nn.Linear(embedding_dim, vocab_size)
        self.softmax = nn.Softmax(dim=2)

        self.logging = logging

    def forward(self, x):
        """
        Arguments:
            x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
        """
        x = self.emb(x)
        x = self.positional_encoding(x)
        residual = x = self.msa(x)
        x = self.ffn(x) + residual
        x = self.fc(x)
        x = self.softmax(x)
        return x

    def gen(self, input_text):
      for i in range(10):
        tokens = tokenize(input_text)
        input_ids = tokens_to_vecs([tokens]).transpose(0, 1).to(device)
        preds = torch.argmax(self.forward(input_ids), dim=2).transpose(0, 1)
        new_token = untokenize(torch.tensor([preds[0][-1]]))
        input_text = input_text + '' + new_token
      return input_text


def pretokenize(corpus):
  return [tokenize('~' + text + '~') for text in corpus]

class TayTayDatasetNaive(torch.utils.data.Dataset):
  def __init__(self, filename):
    with open(filename, 'r') as f:
      self.text = f.read()
      pieces = self.text.split('~')

      self.tokensArray = pretokenize(pieces)

  def __len__(self):
    return len(self.tokensArray)

  def __getitem__(self, idx):
    tokens = self.tokensArray[idx]
    input_ids = tokens_to_vecs([tokens])
    return input_ids[0]


dataset = TayTayDatasetNaive('words.txt')
print(
    'Data length: ',
    len(dataset),
    'Example: ',
    untokenize(torch.argmax(dataset[0], dim=1))
)

def collate_fn(batch):
  min_len = min([len(x) for x in batch])
  batch = [x[:min_len] for x in batch]
  return torch.stack(batch)

train, val = torch.utils.data.random_split(dataset, [0.9, 0.1])
train_loader = torch.utils.data.DataLoader(train, batch_size=1, collate_fn=collate_fn, shuffle=True)
val_loader = torch.utils.data.DataLoader(val, batch_size=1, collate_fn=collate_fn, shuffle=True)
print('Training set has {} instances'.format(len(train)))
print('Validation set has {} instances'.format(len(val)))

def train(model, train_loader, val_loader, optimizer, loss, epochs, generation_template):
  min_v_loss = float('inf')
  all_v = []
  all_t = []

  for epoch in range(epochs):
    start = time.time()
    model.train()
    total_loss = 0
    train_tokens = 0
    for x in train_loader:
      train_tokens += x.shape[1]
      x = x.to(device)
      output = model(x)
      l = loss(output[0][0:-1], x[0][1:])
      l.backward()
      optimizer.step()
      optimizer.zero_grad()
      total_loss += l

    val_loss = 0
    model.eval()
    val_tokens = 0
    for x in val_loader:
      val_tokens += x.shape[1]
      x = x.to(device)
      output = model(x)
      l = loss(output[0][0:-1], x[0][1:])
      val_loss += l

    avg_t_loss = total_loss.detach().cpu().numpy() / train_tokens
    avg_v_loss = val_loss.detach().cpu().numpy() / val_tokens
    all_v.append(avg_v_loss)
    all_t.append(avg_t_loss)

    if avg_v_loss < min_v_loss:
      min_v_loss = avg_v_loss
      torch.save(model.state_dict(), 'taytay-autosave.pt')

    end = time.time()
    deltaT = end - start
    scheduler.step()
    ETA = deltaT * (epochs - epoch - 1)

    print(
        '\ntrain loss: {}, val loss: {}, took {:.2f}s, ETA: {:.2f}s,\ntest generation: {}'
          .format(avg_t_loss, avg_v_loss, end - start, ETA, model.gen(generation_template))
    )
  return all_t, all_v

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print('Using ', device)

#model = torch.load('model.pt').to(device)
model = TayTay(embedding_dim=4, key_dim=4, ffn_layers=2, msa_layers=2).to(device)

# see all parameters
n_params = 0
for name, param in model.named_parameters():
    a = 1
    for i in param.shape:
        a *= i
    n_params += a
    #print(name, param.shape, a)
    #print(param.tolist())

print('Parameters: ', n_params)

loss = nn.CrossEntropyLoss()
lr = 3e-4  # learning rate
optimizer = torch.optim.Adam(model.parameters(), lr=lr)
scheduler = torch.optim.lr_scheduler.StepLR(optimizer, 1.0, gamma=0.95)

all_t, all_v = train(model, train_loader, val_loader, optimizer, loss, 40, '~some')

