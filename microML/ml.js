/* Array of layers consists of numbers i.e. : [1, 4, 3, 10000, 1]
this means that 1st layer will have 1 node and so on and so forth

Model has property "weights", which gives out 3d array
where for each layer and output layer for each node of that layer
weights of connections to previous layers' nodes
[ [ [] ] ]

When number in node is calculated the function of
f(prev, weight) is called and  += assigned to the current node
then it is normalized using sum of f(1, weight) for each weight

Model has two methods - "calculate" gives back array and
requests an array.


TODO : "teach" gives no output, and you give it input data and correct answers

*/

let algo = (u,v) => u*v;
let numberOfInputNodes = 2;
let numberOfOutputNodes = 2;

let myModel = new Model(numberOfInputNodes, numberOfOutputNodes, algo);


function Model (numberOfInputNodes, numberOfOutputNodes, algorythm, arrayOfLayers=[]) {
  let t = this;
  let weights = [[[]]];
  let nodes = [numberOfInputNodes, ...arrayOfLayers, numberOfOutputNodes];

  for (let i = nodes.length-1; i > 1; i++) {
    weights[i-1] = [];
    for (let j = 0; j < nodes[i].length; j++) {
      weights[i-1][j] = [];
      for (let k = 0; k < nodes[i]; k++) {
        weights[i-1][j][k] = 1;
      }
    }
  }

  t.weights = weights;

  t.calculate = arr => {
    for (let i = 0; i < this.weights.length; i++) {
      let res = [];
      for (let j = 0; j < this.weights[i].length; j++) {
        let norm = 0;
        for (let k = 0; k < this.weights[i][j].length; k++) {
          res[j] += algorythm(arr[k], this.weights[i][j][k]);
          norm += algorythm(1, this.weights[i][j][k]);
        }
        res[j] = res[j] / norm;
      }
      arr = res;
    }
    return arr;
  }
}
