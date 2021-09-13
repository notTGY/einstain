const MAX = 255

function Model(layerStructure) {
  const self = this
  this.layerStructure = layerStructure

  const weightsNum = this.layerStructure.reduce(
    (prev, e, i, arr) => i === 0 ? prev : (arr[i-1] + 1)*arr[i]
  )

  this.model = Array(weightsNum).fill(0)

  this.calcOutput = calcModelWithInput

  this.step = (index, step) => {
    const idx = index < self.model.length ? index : index - self.model.length

    const weight = self.model[idx]

    const modifiedWeight = index < self.model.length
      ? Math.min(MAX, weight + step)
      : Math.max(0, weight - step)

    return self.model.map(
      (e, i) => i === idx ? modifiedWeight : e
    )
  }

  this.train = (listOfInputs, listOfExpectedOutputs, step) => {
    for (
      let i = minIdx = 0, minScore = +Infinity; i < self.model.length * 2; i++
    ) {
      const modifiedModel = self.step(i, step)

      const score = listOfInputs.reduce((prev, input, index) => prev
        + getDeviation(
          calcModelWithInput(input, self.layerStructure, modifiedModel),
          listOfExpectedOutputs[index]
        )
      )

      if (score < minScore) {
        minScore = score
        minIdx = i
      }
    }

    self.model = self.step(minIdx, step)
  }

}

function calcModelWithInput(input, layerStructure, model) {
  if (input.length !== layerStructure[0]) throw new Error(`wrong params`)
  if (layerStructure.length === 1) return input

  const [
    inputNeyronsNum,
    outputNeyronsNum,
    ...restLayerStructure
  ] = layerStructure
  if (model.length < (inputNeyronsNum+1)*outputNeyronsNum)
    throw new Error(`not enough model params`)
  if (layerStructure.length === 2 &&
    model.length > (inputNeyronsNum+1)*outputNeyronsNum)
    throw new Error(`too much model params`)
  
  const nextLayerRes = []

  const getWeight = (inNode, outNode) =>
    model[inNode*outputNeyronsNum + outNode]

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
  return calcModelWithInput(
    nextLayerRes,
    [outputNeyronsNum, ...restLayerStructure],
    model.slice((inputNeyronsNum+1)*outputNeyronsNum)
  )
}

function getDeviation(vec1, vec2) {
  if (vec1.length !== vec2.length)
    throw new Error(`comparing vectors from different spaces`)
  return vec1.reduce((prev, e, i) => prev + (e - vec2[i])**2, 0)
}

const layerStructure = [ 2, 1 ]

const in1 = [ 0, 0 ]
const in2 = [ 0, MAX ]
const in3 = [ MAX, 0 ]
const in4 = [ MAX, MAX ]
const out1 = [ 0 ]
const out2 = [ MAX ]
const out3 = [ MAX ]
const out4 = [ MAX ]

function start() {
  let model = new Model(layerStructure)

  let listOfInputs = [in1, in2, in3, in4]
  let listOfExpectedOutputs = [out1, out2, out3, out4]

  getCurResultsForNetwork(model.model, listOfInputs)
  for (let i = 0; i < 1e3; i++) {
    const step = Math.max(1, Math.floor(MAX / (i+1)))
    model.train(listOfInputs, listOfExpectedOutputs, step)
  }
  getCurResultsForNetwork(model.model, listOfInputs, listOfExpectedOutputs)
  console.log(model.model)
}

start()

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
