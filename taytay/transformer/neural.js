// https://www.youtube.com/watch?v=bQ5BoolX9Ag
let parameters = 0

// https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
function sfc32(a, b, c, d) {
  return function() {
    parameters++
    a |= 0; b |= 0; c |= 0; d |= 0; 
    var t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}
const seed = 1337 ^ 0xDEADBEEF
const rand = sfc32(
  0x9E3779B9, 0x243F6A88, 0xB7E15162, seed
)

// M - tokens
// ~ - <EOS>
// $ - <UNK>
const M=['~','$', ' ', '\n', '\'', ',']
for (let i = 26; i --> 0;) {
  M[i+6]=String.fromCharCode(97+i)
}
const vocabSize = 32

export const tokenize = (str) => {
  const tokens = []
  for (const letter of str) {
    let num = M.indexOf(letter)
    if (num === -1) {
      num = 1
    }
    tokens.push(num)
  }
  return tokens
}

export const untokenize = (tokens) => {
  const letters = []
  for (const token of tokens) {
    const letter = M[token]
    letters.push(letter)
  }
  return letters.join('')
}

const token_to_vec = (token) => {
  const vec = new Array(vocabSize).fill(0)
  vec[token] = 1
  return vec
}

const matmul = (vs, weights2d) =>
  vs.map(v =>
    weights2d.map(ws => 
      ws.reduce((acc, w_i, i) => acc + w_i*v[i], 0)
    )
  )

const softmax = (v) => {
  const norm = v.reduce((acc, v_i) => acc + Math.exp(v_i), 0)
  return v.map(v_i => Math.exp(v_i) / norm)
}


const embeddingDim = 2
const embeddingWeights = []
for (let j = 0; j < embeddingDim; j++) {
  embeddingWeights[j] = []
  for (let i = 0; i < vocabSize; i++) {
    embeddingWeights[j][i] = 4*(rand()-0.5)
  }
}
const embedding = (vs) => {
  return matmul(vs, embeddingWeights)
}

const positional_encoding = (vs) => {
  return vs.map((v, n) =>
    v.map((v_i, i) => {
      if (i%2 === 0) {
        return Math.sin(n* ((i / 2)+1)) + v_i
      } else {
        return Math.cos(n* ((i-1) / 2 + 1)) + v_i
      }
    })
  )
}

const queryDim = 2
const queryMatrix = []
for (let i = 0; i < queryDim; i++) {
  queryMatrix[i] = []
  for (let j = 0; j < embeddingDim; j++) {
    queryMatrix[i][j] = 4*(rand()-.5)
  }
}
const keyDim = queryDim // we get dot product of those
const keyMatrix = []
for (let i = 0; i < keyDim; i++) {
  keyMatrix[i] = []
  for (let j = 0; j < embeddingDim; j++) {
    keyMatrix[i][j] = 4*(rand()-.5)
  }
}
const valueDim = embeddingDim // we sum with residuals
const valueMatrix = []
for (let i = 0; i < valueDim; i++) {
  valueMatrix[i] = []
  for (let j = 0; j < embeddingDim; j++) {
    valueMatrix[i][j] = 4*(rand()-.5)
  }
}
const maskedSelfAttention = (vecs) => {
  const ks = matmul(vecs, keyMatrix)
  const qs = matmul(vecs, queryMatrix)
  const values = matmul(vecs, valueMatrix)

  const vs = qs.map((q, m) => {

    const maskedKs = ks.filter((_, n) => n <= m)
    const similarities = maskedKs.map((k, n) =>
      k.reduce((acc, k_i, i) => acc + k_i * q[i], 0)
    )
    const precentages = softmax(similarities)
    
    const v = []
    for (let i = 0; i < valueDim; i++) {
      v[i] = precentages.reduce((acc, p_n, n) =>
        acc + p_n * values[n][i]
      , 0)
    }
    return v
  })

  return vs
}

const residualLayer = (vs, residual) => {
  return vs.map((v, n) =>
    v.map((v_i, i) => v_i + residual[n][i])
  )
}

const FCweights = []
for (let i = 0; i < vocabSize; i++) {
  FCweights[i] = []
  for (let j = 0; j < valueDim; j++) {
    FCweights[i][j] = 4*(rand()-.5)
  }
}
const FCbias = []
for (let j = 0; j < vocabSize; j++) {
  FCbias[j] = 4*(rand()-.5)
}
const FCLayer = (vs) => {
  return matmul(vs, FCweights).map(
      v => v.map((v_i, i) => v_i + FCbias[i])
    )
}
const softmaxLayer = (vs) => {
  return vs.map(softmax)
}
const argmax = (vs) => {
  return vs.map(v => {
    let arg = 0
    for (let i = 0; i < v.length; i++) {
      if (v[i] >= v[arg]) {
        arg = i
      }
    }
    return arg
  })
}

export const model = (input_ids) => {
  const input_vecs = input_ids.map(token_to_vec)
  let vs = input_vecs

  vs = embedding(vs)
  let residual = vs = positional_encoding(vs)
  vs = maskedSelfAttention(vs)
  residual = vs = residualLayer(vs, residual)
  // <-- here goes optional FFN + residual
  vs = FCLayer(vs)
  vs = softmaxLayer(vs)

  const output_ids = argmax(vs)
  return output_ids
}

console.log('Parameters %d', parameters)
