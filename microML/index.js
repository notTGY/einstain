const MAX = 255


/**
 * input consists input params of the model (n1 numbers between 0 and 255)
 * layerStructure consists of n, where n is number of nodes in each layer 
 * ( [ n1, n2, ... nlast ] )
 * model is flat array of biases 
 * ( n2 for the first node + n2 for the second ... + n2 for n1,
 * then n3 for n1+1 ... n3 for n1+n2, then ... ,
 * then nlast for n1 + n2 + ... + nlast-1 + 1 and so on )
 * 
 * function outputs array with length nlast numbers (the res)
 */
function calcModelWithInput(input, layerStructure, model) {
  if (input.length !== layerStructure[0]) throw new Error(`wrong params`)
  if (layerStructure.length === 1) return input

  const [
    inputNeyronsNum,
    outputNeyronsNum,
    ...restLayerStructure
  ] = layerStructure
  if (model.length < inputNeyronsNum*outputNeyronsNum)
    throw new Error(`not enough model params`)
  
  const nextLayerRes = []

  const getWeight = (inNode, outNode) =>
    model[inNode*outputNeyronsNum + outNode]

  for (let i = 0; i < outputNeyronsNum; i++) {
    let sum = 0;
    for (let j = 0; j < inputNeyronsNum; j++) {
      const weight = getWeight(j, i)
      sum += weight
    }
    let outputForNeyron = 0;
    if (sum !== 0)
      for (let j = 0; j < inputNeyronsNum; j++) {
        const weight = getWeight(j, i)
        outputForNeyron += (input[j] / MAX) * (weight / sum)
      }

    nextLayerRes[i] = Math.floor(MAX * outputForNeyron)
  }
  return calcModelWithInput(
    nextLayerRes,
    [outputNeyronsNum, ...restLayerStructure],
    model.slice(inputNeyronsNum*outputNeyronsNum)
  )
}

function getCurResultsForNetwork(model, listOfInputs, expectedOutputs) {
  listOfInputs.forEach(
    (input, index) => {
      const res = calcModelWithInput(input, layerStructure, model)
      if (expectedOutputs) {
        const expected = expectedOutputs[index]
        const deviation = getDeviation(res, expected)
        document.body.innerHTML +=
          `got: ${res.join(' ')}, expected: ${expected.join(' ')}, deviation: ${deviation}<br>`
        return
      }
      document.body.innerHTML +=
        `got: ${res.join(' ')}<br>`
    }
  )
  document.body.innerHTML +='<br>'
}

function stepModel(model, index, step) {
  if (index < model.length) {
    const weight = model[index]
    const modifiedWeight = Math.min(MAX, weight + step)
    return modifiedModel = model.map(
      (e, idx) => idx === index ? modifiedWeight : e
    )
  }

  const weight = model[index - model.length]
  const modifiedWeight = Math.max(0, weight - step)
  return model.map((e, idx) => idx === index ? modifiedWeight : e)
}

function getDeviation(vec1, vec2) {
  if (vec1.length !== vec2.length)
    throw new Error(`comparing vectors from different spaces`)
  let deviation = 0
  vec1.forEach((e, i) => deviation += (e-vec2[i])**2)
  return deviation
}

/**
 * returns slightly modified version of model to better match expected results
 */
function train(model, listOfInputs, listOfExpectedOutputs, step) {
  const scores = []
  for (let i = 0; i < model.length * 2; i++) {
    const modifiedModel = stepModel(model, i, step)
    scores[i] = 0
    listOfInputs.forEach((input, index) => {
      const res = calcModelWithInput(input, layerStructure, modifiedModel)
      const deviation = getDeviation(res, listOfExpectedOutputs[index])
      scores[i] += deviation
    })
  }

  let minIdx = 0
  scores.forEach((e, i) => minIdx = e < scores[minIdx] ? i : minIdx)
  document.body.innerHTML += minIdx + '<br>'
  return stepModel(model, minIdx, step)
}

function modelForLayerStructure(layerStructure) {
  let sum = 0
  for (let i = 1; i < layerStructure.length; i++)
    sum += layerStructure[i-1]*layerStructure[i]
  let res = []
  for (let i = 0; i < sum; i++) res[i] = Math.floor(MAX * Math.random())
  return res
}

const layerStructure = [ 2, 8, 9, 1 ]

const in1 = [ 0, 0 ]
const in2 = [ 0, MAX ]
const in3 = [ MAX, 0 ]
const in4 = [ MAX, MAX ]
const out1 = [ 0 ]
const out2 = [ MAX ]
const out3 = [ MAX ]
const out4 = [ MAX ]

function start() {
  let model = modelForLayerStructure(layerStructure)

  let listOfInputs = [in1, in2, in3, in4]
  let listOfExpectedOutputs = [out1, out2, out3, out4]

  getCurResultsForNetwork(model, listOfInputs)
  for (let i = 0; i < 20; i++) {
    const step = Math.floor(MAX / (i+1))
    model = train(model, listOfInputs, listOfExpectedOutputs, step)
    getCurResultsForNetwork(model, listOfInputs, listOfExpectedOutputs)
  }
}

start()
