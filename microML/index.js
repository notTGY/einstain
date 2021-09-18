const c = document.getElementById('c')
c.width = c.height = 20
const ctx = c.getContext('2d')

const sleep = e => new Promise(r => setTimeout(r, e))

async function generateMNIST() {
  let MNISTinput = [[]]
  let MNISToutput = [[]]
  for (let i = 9; i >= 0; i--) {
    MNISToutput[i] = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    MNISToutput[i][i] = MAX

    ctx.clearRect(0, 0, c.width, c.height)
    ctx.fillText(i, 2, 9)
    const frame = ctx.getImageData(0, 0, c.width, c.height)
    await sleep(300)
    const data = frame.data

    let pixelData = []
    for (let j = 0; j < data.length / 4; j++) {
      const o = data[4*j + 3]
      pixelData[j] = o
    }
    MNISTinput[i] = pixelData
  }
  return { input: MNISTinput, output: MNISToutput }
}

const MAX = 255


/**
 * input consists input params of the model (n1 numbers between 0 and 255)
 * layerStructure consists of n, where n is number of nodes in each layer 
 * ( [ n1, n2, ... nlast ] )
 * model is flat array of weights
 * ( n2 for the first node + n2 for the second ... + n2 for n1,
 * n2 for bias, then n3 for n1+1 ... n3 for n1+n2, n3 for second bias,
 * then ... , then nlast for n1 + n2 + ... + nlast-1 + 1 and so on )
 * 
 * function outputs array with length nlast numbers (the res)
 */
async function calcModelWithInput(input, layerStructure, model) {
  if (input.length !== layerStructure[0])
    throw new Error(`layer structure and input params do not match`)
  /**
   * 1-layer neural network
   */
  if (layerStructure.length === 1) return input

  const [
    inputNeyronsNum,
    outputNeyronsNum,
    ...restLayerStructure
  ] = layerStructure

  if (model.length < (inputNeyronsNum + 1)*outputNeyronsNum)
    throw new Error(`not enough model params`)

  if (layerStructure.length === 2 &&
    model.length > (inputNeyronsNum + 1)*outputNeyronsNum)
    throw new Error(`too much model params`)
  

  /**
   * Function that matches weight between inNeyron and outNeyron
   */
  const getWeight = (inNeyron, outNeyron) =>
    model[inNeyron*outputNeyronsNum + outNeyron]

  /**
   * Calculate each neyron value in the next layer
   */
  const nextLayerRes = []

  for (let i = 0; i < outputNeyronsNum; i++) {
    let sum = 0;
    for (let j = 0; j < inputNeyronsNum; j++) {
      const weight = getWeight(j, i)
      sum += weight
    }
    sum += getWeight(inputNeyronsNum, i)

    let outputForNeyron = 0;
    if (sum !== 0) {
      for (let j = 0; j < inputNeyronsNum; j++) {
        const weight = getWeight(j, i)
        outputForNeyron += (input[j] / MAX) * (weight / sum)
      }
      outputForNeyron += getWeight(inputNeyronsNum, i) / sum
    }

    nextLayerRes[i] = Math.floor(MAX * outputForNeyron)
  }
  /**
   * Recursively call as if NN is 1 layer less and current output is an input
   */
  return await calcModelWithInput(
    nextLayerRes,
    [outputNeyronsNum, ...restLayerStructure],
    model.slice((inputNeyronsNum+1)*outputNeyronsNum)
  )
}

/**
 * Get deviation between n-dimensional vectors
 * (Pythagoras theorem)
 */
function getDistance(vec1, vec2) {
  if (vec1.length !== vec2.length)
    throw new Error(`getting distance between vectors from different spaces`)
  return vec1.reduce((prev, e, i) => prev + (e-vec2[i])**2, 0)
}

/**
 * Steps model at index = index % model.lenght
 * if index > model.length, step in negative direction
 * else in positive
 */
async function stepModel(model, index, step) {
  const idx = index < model.length
    ? index
    : index - model.length
  const weight = model[idx]
  const modifiedWeight = index < model.length
    ? Math.min(MAX, weight + step)
    : Math.max(0, weight - step)
  return model.map(
    (e, i) => i === idx ? modifiedWeight : e
  )
}

/**
 * returns slightly modified version of model to better match expected results
 */
async function train(model, listOfInputs, listOfExpectedOutputs, step) {
  for (let i = minIdx = 0, minScore = +Infinity; i < model.length * 2; i++) {
    const modifiedModel = await stepModel(model, i, step)

    const score = listOfInputs.reduce(async (prev, input, index) => {
      const res = await calcModelWithInput(input, layerStructure, modifiedModel)
      const distance = getDistance(res, listOfExpectedOutputs[index])
      return prev + distance
    })
    if (score < minScore) {
      minScore = score
      minIdx = i
    }
  }

  return await stepModel(model, minIdx, step)
}

/**
 * Generate model with all 0 weights to match given layer structure
 */
function modelForLayerStructure(layerStructure) {
  let neyronsNum = 0
  for (let i = 1; i < layerStructure.length; i++)
    neyronsNum += (layerStructure[i-1]+1)*layerStructure[i]
  return Array(neyronsNum).fill(MAX)
}

const layerStructure = [ 400, 10 ]

async function start() {
  let model = modelForLayerStructure(layerStructure)

  const { input: listOfInputs, output: listOfExpectedOutputs } = await generateMNIST()

  getCurResultsForNetwork(model, listOfInputs)
  for (let i = 0; i < 9; i++) {
    const step = Math.max(1, Math.floor(MAX / (i+1)))
    model = await train(model, listOfInputs, listOfExpectedOutputs, step)
    getCurResultsForNetwork(model, listOfInputs, listOfExpectedOutputs)
  }
  getCurResultsForNetwork(model, listOfInputs, listOfExpectedOutputs)
  console.log(model)
}

start()

/**
 * Fancy logging function
 */
function getCurResultsForNetwork(model, listOfInputs, expectedOutputs) {
  listOfInputs.forEach(
    async (input, index) => {
      const res = await calcModelWithInput(input, layerStructure, model)
      if (expectedOutputs) {
        const expected = expectedOutputs[index]
        const distance = getDistance(res, expected)
        document.body.innerHTML +=
          `got: ${res.join(' ')}, expected: ${expected.join(' ')}, distance: ${distance}<br>`
        return
      }
      document.body.innerHTML += `got: ${res.join(' ')}<br>`
    }
  )
  document.body.innerHTML +='<br>'
}
