# -*- coding: utf-8 -*-
"""taytay.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1gI_zUoHHc1l4wKdUeQk8ywZq2H3G3ECz
"""

import torch
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

tokenize('hello, how are you?')
hello_world_tokens = [
    13,
    10,
    17,
    17,
    20,
    5,
    2,
    13,
    20,
    28,
    2,
    6,
    23,
    10,
    2,
    30,
    20,
    26,
    1
]
# expect tensor of zeros
tokenize('hello, how are you?') == hello_world_tokens

def untokenize(ids):
  chars = []
  id_list = ids.tolist()
  for idx in id_list:
      char = M[idx]
      chars.append(char)
  return ''.join(chars)

untokenize(torch.tensor(hello_world_tokens))
# hello, how are you$

def token_to_vec (token):
  out = torch.zeros(vocab_size)
  out[token] = 1.
  return out
# expect 1 at index 2
token_to_vec(2)

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
positional_encoding = PositionalEncoding(d_model=2)
x = torch.tensor([[[1., 2.]], [[5., 6.]], [[7., 8.]]])

output = positional_encoding(x)
print(output)
output.shape

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

attn = MaskedSelfAttention(key_dim=5, embedding_dim=2)
x = torch.tensor([[[1., 2.], [3., 4.]], [[5., 6.], [7., 8.]]])

output = attn(x)
print(output)

class Model(nn.Module):
    def __init__(self, embedding_dim=2, key_dim=2):
        super().__init__()
        self.emb = nn.Linear(vocab_size, embedding_dim, bias=False)
        self.positional_encoding = PositionalEncoding(d_model=embedding_dim)
        self.msa = MaskedSelfAttention(key_dim=key_dim, embedding_dim=embedding_dim)
        self.fc = nn.Linear(embedding_dim, vocab_size, bias=True)
        self.softmax = nn.Softmax(dim=2)

    def forward(self, x):
        """
        Arguments:
            x: Tensor, shape ``[seq_len, batch_size, embedding_dim]``
        """
        x = self.emb(x)
        residual = x = self.positional_encoding(x)
        x = self.msa(x)
        residual = x = x + residual
        x = self.fc(x)
        x = self.softmax(x)
        return x

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = torch.load('model.pt').to(device)
#model = Model().to(device)

torch.save(model, 'model.pt')

# see all parameters
n_params = 0
for name, param in model.named_parameters():
    print(name, param.shape, param.shape[0])

    if name == 'fc.bias':
      print(param.tolist())
    else:
      print(param.tolist())

    a = 1
    for i in param.shape:
        a *= i
    n_params += a

print(n_params)

text = '~silent '

tokens = tokenize(text)

input_ids = tokens_to_vecs([tokens]).transpose(0, 1)
output_ids = model(input_ids)
preds = torch.argmax(output_ids, dim=2).transpose(0, 1)
output_text = untokenize(preds[0])

print(output_text)
