import styles from "../../styles/NeuralNets.module.css";
import { useState } from "react";

export class NeuralNet {
  constructor(neurons) {
    this.biggestLayer = 0; // number of neurons in the biggest layer
    this.neurons = neurons;
    this.numNeurons = 0;
    this.getLayerNums();
    this.inputs = [];
    this.output;

    this.layers = [];
    for (let i = 0; i < this.numLayers; i++) {
      this.layers.push([]);
    }

    this.neurons.forEach((neuron) => {
      if (neuron.isInput) {
        this.inputs.push(neuron);
      } else if (neuron.isOutput) {
        this.output = neuron;
      } else {
        this.layers[neuron.layer - 1].push(neuron);
      }
    });
  }

  getLayerNums() {
    let layers = {};

    this.neurons.forEach((neuron) => {
      if (neuron.isInput) {
      } else if (neuron.isOutput) {
      } else {
        layers[neuron.layer] = layers[neuron.layer]
          ? layers[neuron.layer] + 1
          : 1;
      }
    });
    this.numLayers = Object.keys(layers).length;
    //iterate through layers and find the biggest layer
    for (let layer in layers) {
      // console.log(layers[layer]);
      if (layers[layer] > this.biggestLayer) {
        this.biggestLayer = layers[layer];
      }
    }

    // console.log(
    //   `Num layers: ${this.numLayers}, num neurons: ${this.biggestLayer}`
    // );
  }

  addLayer() {
    this.numLayers++;
    this.getLayerNums();
    return this;
  }
  addNeuron(layer, func) {
    this.neurons.push(new Neuron(false, false, 0, layer));
    this.getLayerNums();
    return this;
  }
}

export class Neuron {
  constructor(
    isInput,
    isOutput,
    index = 0,
    layer = 0,
    weights = {},
    bias = 0,
    activation = 0
  ) {
    this.isInput = isInput;
    this.isOutput = isOutput;
    this.layer = layer;
    this.index = index;
    this.weights = weights;
    this.bias = bias;
    this.activation = activation;
    this.value = 0;
  }
}

export class Point {
  constructor(x, y, group) {
    this.x = x;
    this.y = y;
    this.group = group;
  }
}

export function linear(inp) {
  return inp;
}

export function sigmoid(inp) {
  return 1 / (1 + Math.exp(-inp));
}

export function relu(inp) {
  return Math.max(0, inp);
}

export function tanh(inp) {
  return Math.tanh(inp);
}

export function leakyRelu(inp) {
  return Math.max(0.01 * inp, inp);
}

export const calculateNet = (net, x, y) => {
  // console.log("Uga buga ", net);
  net.layers.forEach((layer) => {
    layer.forEach((neuron) => {
      if (neuron.layer == 1) {
        switch (neuron.activation) {
          case "linear":
            neuron.value = linear(
              neuron.bias + neuron.weights[0] * x + neuron.weights[1] * y
            );
            break;
          case "sigmoid":
            neuron.value = sigmoid(
              neuron.bias + neuron.weights[0] * x + neuron.weights[1] * y
            );
            break;
          case "relu":
            neuron.value = relu(
              neuron.bias + neuron.weights[0] * x + neuron.weights[1] * y
            );
            break;
          case "tanh":
            neuron.value = tanh(
              neuron.bias + neuron.weights[0] * x + neuron.weights[1] * y
            );
            break;
          case "leakyRelu":
            neuron.value = leakyRelu(
              neuron.bias + neuron.weights[0] * x + neuron.weights[1] * y
            );
            break;

          default:
            console.log("Unknow activation function error");
            break;
        }
      } else {
        let sum = 0;
        net.layers[neuron.layer - 2].forEach((prevNeuron) => {
          sum += prevNeuron.value * neuron.weights[prevNeuron.index];
        });
        switch (neuron.activation) {
          case "linear":
            neuron.value = linear(sum + neuron.bias);
            break;
          case "sigmoid":
            neuron.value = sigmoid(sum + neuron.bias);
            break;
          case "relu":
            neuron.value = relu(sum + neuron.bias);
            break;
          case "tanh":
            neuron.value = tanh(sum + neuron.bias);
            break;
          case "leakyRelu":
            neuron.value = leakyRelu(sum + neuron.bias);
            break;

          default:
            console.log("Unknow activation function error");
            break;
        }
      }
    });
  });
  let sum = 0;
  net.layers[net.numLayers - 1].forEach((prevNeuron) => {
    sum += prevNeuron.value * net.output.weights[prevNeuron.index];
  });
  switch (net.output.activation) {
    case "linear":
      return linear(sum + net.output.bias);
    case "sigmoid":
      return sigmoid(sum + net.output.bias);
    case "relu":
      return relu(sum + net.output.bias);
    default:
      throw new Error("Unknow activation function error");
  }
};

/**
 * Generates random points in a 2D space with a given number of groups
 * @param {int} numPoints Number of points to generate
 * @param {int} numGroups Number of groups to be generated
 * @param {int} height Maximum height of the space
 * @param {int} width Maximum width of the space
 * @returns {Point[]} Array of points
 */
export const generatePoints = (numPoints, numGroups, height, width) => {
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let x = Math.random() * width - width / 2;
    let y = Math.random() * height - height / 2;
    let group = Math.floor(Math.random() * numGroups);
    points.push(new Point(x, y, group));
  }
  return points;
};

export const createNeuronPanel = (
  showThis,
  net,
  setNet,
  neuron,
  setEditingNet,
  setShouldRedraw //Shouldn't need this but I guess I have to since setNet doesn't want to redraw the image...
) => {
  const [reloadVals, setReload] = useState(true);
  const [activation, setActivation] = useState(null);
  const [prevNeuron, setPrevNeuron] = useState(null);

  if (prevNeuron != neuron) {
    setReload(true);
    setPrevNeuron(neuron);
  }
  if (!showThis && !reloadVals) {
    setReload(true);
  }
  if (!showThis) {
    return null;
  }
  if (showThis && reloadVals) {
    setActivation(neuron.activation);
    setReload(false);
  }
  console.log(neuron);
  if (neuron.isOutput) {
    return (
      <div className={styles.neuronPanel}>
        <div className={styles.sliderDiv}>
          <label htmlFor="">Activation</label>
          <select
            name="activation"
            id="neuronActivation"
            value={activation}
            onChange={(e) => {
              setActivation(e.target.value);
            }}
          >
            <option value="linear">Linear</option>
            <option value="sigmoid">Sigmoid</option>
            <option value="relu">Relu</option>
            <option value="tanh">Tanh</option>
            <option value="leakyRelu">Leaky Relu</option>
          </select>
        </div>
        <div className={styles.sliderDiv}>
          <label htmlFor="">Bias</label>
          <input
            type="range"
            name="bias"
            id="neuronBias"
            max="1"
            min="-1"
            step="0.01"
            value={neuron.bias}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          />
        </div>
        {Object.keys(neuron.weights).map((key) => {
          console.log(neuron.weights[key]);
          return (
            <div key={key} className={styles.sliderDiv}>
              <label htmlFor="">Weight {key}</label>
              <input
                type="range"
                name="weight"
                id={`neuronWeight${key}`}
                max="1"
                min="-1"
                step="0.01"
                value={net.output.weights[key]}
                onChange={(e) => {
                  console.log(e.target.value);
                  let newNet = net;
                  newNet.output.weights[key] = e.target.value;
                  setNet(newNet);
                }}
              />
            </div>
          );
        })}
        <button
          className={styles.doneButton}
          onClick={(e) => setEditingNet(false)}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className={styles.neuronPanel}>
      <div className={styles.sliderDiv}>
        <label htmlFor="">Activation</label>
        <select
          name="activation"
          id="neuronActivation"
          value={activation}
          onChange={(e) => {
            setActivation(e.target.value);
            let newNet = net;
            newNet.layers[neuron.layer - 1][neuron.index].activation =
              e.target.value;
            setNet(newNet);
            setShouldRedraw(true);
          }}
        >
          <option value="linear">Linear</option>
          <option value="sigmoid">Sigmoid</option>
          <option value="relu">Relu</option>
          <option value="tanh">Tanh</option>
          <option value="leakyRelu">Leaky Relu</option>
        </select>
      </div>
      <div className={styles.sliderDiv}>
        <label htmlFor="">Bias</label>
        <input
          type="range"
          name="bias"
          id="neuronBias"
          max="1"
          min="-1"
          step="0.01"
          value={neuron.bias}
          onChange={(e) => {
            console.log(e.target.value);
            let newNet = net;
            newNet.layers[neuron.layer - 1][neuron.index].bias = e.target.value;
            setNet(newNet);
            setShouldRedraw(true);
          }}
        />
      </div>
      {Object.keys(neuron.weights).map((key) => {
        console.log(neuron.weights[key]);
        return (
          <div key={key} className={styles.sliderDiv}>
            <label htmlFor="">Weight {key}</label>
            <input
              type="range"
              name="weight"
              id={`neuronWeight${key}`}
              max="1"
              min="-1"
              step="0.01"
              value={net.layers[neuron.layer - 1][neuron.index].weights[key]}
              onChange={(e) => {
                console.log(e.target.value);
                let newNet = net;
                newNet.layers[neuron.layer - 1][neuron.index].weights[key] =
                  e.target.value;
                setNet(newNet);
                setShouldRedraw(true);
              }}
            />
          </div>
        );
      })}
      <button
        className={styles.doneButton}
        onClick={(e) => setEditingNet(false)}
      >
        Done
      </button>
    </div>
  );
};
