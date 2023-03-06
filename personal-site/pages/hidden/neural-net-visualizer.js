import styles from "../../styles/NeuralNets.module.css";
import Layout from "../../components/Layout";
import { useRef, useEffect, useState } from "react";

const resizeCanvasToDisplaySize = (canvas) => {
  if (!canvas) return;

  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // If it's resolution does not match change it
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
};

const drawPoints = (canvas, points) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  ctx.strokeStyle = "white";
  points.forEach((point) => {
    console.log(point);
    ctx.fillStyle = point.group == 1 ? "red" : "blue";
    ctx.beginPath();
    ctx.arc(centerX + point.x, centerY + point.y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  });
};

const drawAxis = (canvas) => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  ctx.strokeStyle = "white";
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX - 10, 20);
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX + 10, 20);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(width, centerY);
  ctx.lineTo(width - 20, centerY - 10);
  ctx.moveTo(width, centerY);
  ctx.lineTo(width - 20, centerY + 10);
  ctx.stroke();
};

const drawNet = (canvas, net) => {
  const ctx = canvas.getContext("2d");
  let boxWidth = 400;
  let boxHeight = 150;

  if (net.numLayers > 3) {
    boxWidth = net.numLayers * 100;
  }
  if (net.numNeurons > 3) {
    boxHeight = net.numNeurons * 50;
  }
  ctx.fillStyle = "black";
  ctx.strokeStyle = "white";
  ctx.fillRect(0, 0, boxWidth, boxHeight);
  ctx.strokeRect(0, 0, boxWidth, boxHeight);

  net.neurons.forEach((neuron) => {
    ctx.strokeStyle = "white";
    ctx.fillStyle = "black";

    if (neuron.isInput) {
      ctx.beginPath();
      ctx.arc(50, ((neuron.index + 1) * boxHeight) / 3, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    } else if (neuron.isOutput) {
      // output neuron connections
      ctx.lineWidth = 5;
      for (const [id, weight] of Object.entries(neuron.weights)) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.abs(weight)})`;

        ctx.beginPath();
        ctx.moveTo(boxWidth - 50, boxHeight / 2);
        ctx.lineTo(
          boxWidth / 2 - net.numLayers * 35 + net.numLayers * 70 - 35,
          boxHeight / 2 - net.biggestLayer * 25 + id * 50 + 25
        );
        ctx.stroke();
      }
      ctx.lineWidth = 2;
      ctx.strokeStyle = "white";
      // output neuron
      ctx.beginPath();
      ctx.arc(boxWidth - 50, boxHeight / 2, 20, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    } else {
      // draw connections
      ctx.lineWidth = 5;
      for (const [id, weight] of Object.entries(neuron.weights)) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${Math.abs(weight)})`;
        ctx.beginPath();
        ctx.moveTo(
          boxWidth / 2 - net.numLayers * 35 + neuron.layer * 70 - 35,
          boxHeight / 2 - net.biggestLayer * 25 + neuron.index * 50 + 25
        );
        if (neuron.layer > 1 && neuron.layer <= net.numLayers) {
          ctx.lineTo(
            boxWidth / 2 - net.numLayers * 35 + (neuron.layer - 1) * 70 - 35,
            boxHeight / 2 - net.biggestLayer * 25 + id * 50 + 25
          );
          ctx.stroke();
        } else if (neuron.layer <= 1) {
          console.log(id, (boxHeight + id * boxHeight) / 3); // I hate js
          ctx.lineTo(50, (boxHeight + id * boxHeight) / 3); // (boxHeight*(id + 1)) / 3 != (boxHeight + id * boxHeight) / 3
          ctx.stroke();
        }
      }
      ctx.lineWidth = 2;
    }
  });
  net.neurons.forEach((neuron) => {
    if (!(neuron.isOutput || neuron.isInput)) {
      ctx.strokeStyle = "white";
      console.log(neuron);
      ctx.beginPath();
      ctx.arc(
        boxWidth / 2 - net.numLayers * 35 + neuron.layer * 70 - 35,
        boxHeight / 2 - net.biggestLayer * 25 + neuron.index * 50 + 25,
        20,
        0,
        2 * Math.PI
      );
      ctx.fill();
      ctx.stroke();
    }
  });
};

const draw = (canvas, net, points, showNet) => {
  console.log(net);
  resizeCanvasToDisplaySize(canvas);
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  console.log(points);
  drawPoints(canvas, points);
  drawAxis(canvas);
  console.log(showNet);
  if (showNet) {
    drawNet(canvas, net);
  }
};

class Neuron {
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
  }
}

class Point {
  constructor(x, y, group) {
    this.x = x;
    this.y = y;
    this.group = group;
  }
}

const generatePoints = (numPoints, numGroups, height, width) => {
  let points = [];
  for (let i = 0; i < numPoints; i++) {
    let x = Math.random() * width - width / 2;
    let y = Math.random() * height - height / 2;
    let group = Math.floor(Math.random() * numGroups);
    points.push(new Point(x, y, group));
  }
  return points;
};

class NeuralNet {
  constructor(neurons) {
    this.biggestLayer = 0; // number of neurons in the biggest layer
    this.neurons = neurons;
    this.numNeurons = 0;
    this.getLayerNums();
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
      if (layers[layer] > this.biggestLayer) {
        this.biggestLayer = layers[layer];
      }
    }
    console.log(layers);
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

export default function NeuralNetVisualizer() {
  const [actFunc, setActFunc] = useState("linear");
  const [net, setNet] = useState(
    new NeuralNet([
      new Neuron(false, true, 0, -2, { 0: 0.5, 1: 0.5 }),
      new Neuron(false, false, 0, 1, { 0: 0.25, 1: 0.75 }),
      new Neuron(false, false, 1, 1, { 0: 0.5, 1: 0.3333 }),
      new Neuron(false, false, 0, 2, { 0: 0.25, 1: 0.75 }),
      new Neuron(false, false, 1, 2, { 0: 0.5, 1: 0.5 }),
      new Neuron(true, false, 0, -1),
      new Neuron(true, false, 1, -1),
    ])
  );
  const [points, setPoints] = useState(generatePoints(10, 2, 100, 100));
  const [showNet, setShowNet] = useState(true);

  const canvasRef = useRef();

  useEffect(() => {
    window.addEventListener("resize", () => {
      const canvas = canvasRef.current;
      draw(canvas, net, points, showNet);
    });
    const canvas = canvasRef.current;
    draw(canvas, net, points, showNet);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    draw(canvas, net, points, showNet);
  }, [showNet]);
  useEffect(() => {
    const canvas = canvasRef.current;
    draw(canvas, net, points, showNet);
  }, [net]);
  useEffect(() => {
    const canvas = canvasRef.current;
    draw(canvas, net, points, showNet);
  }, [points]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Layout title="Neural net visualizer" isMonoLang={true}>
      <div className={styles.content}>
        <h1>Neural net visualizer</h1>
        <div className={styles.topBar}>
          <form onSubmit={handleSubmit} className={styles.topForm}>
            <div className={styles.formEntry}>
              <label htmlFor="hideNet">Hide the neural net:</label>
              <button
                id="hideNet"
                onClick={(e) => {
                  e.preventDefault();
                  setShowNet(!showNet);
                }}
              >
                {showNet ? "Hide" : "Show"}
              </button>
            </div>
            <div className={styles.formEntry}>
              <label htmlFor="actFunc">Activation function:</label>
              <select name="actFunc" id="actFunc">
                <option value="linear">Linear</option>
                <option value="sigmoid">Sigmoid</option>
                <option value="tanh">Tanh</option>
                <option value="relu">ReLU</option>
                <option value="leakyRelu">Leaky ReLU</option>
              </select>
            </div>

            <div className={styles.formEntry}>
              <label htmlFor="numLayers">Number of layers:</label>
              <button
                id="addLayer"
                onClick={(e) => {
                  e.preventDefault();
                  setNet(net.addLayer());
                }}
              >
                Add layer
              </button>
            </div>
            <div className={styles.formEntry}>
              <label htmlFor="numNeurons">Number of neurons:</label>
              <button id="addNeuron">Add neuron</button>
            </div>
            <div className={styles.formEntry}>
              <label htmlFor="pointsGen">Generate random points:</label>
              <button
                id="pointsGen"
                onClick={(e) => {
                  e.preventDefault();
                  setPoints(
                    generatePoints(
                      10,
                      2,
                      canvasRef.current.height,
                      canvasRef.current.width
                    )
                  );
                }}
              >
                Generate points
              </button>
            </div>
          </form>
        </div>
        <canvas
          ref={canvasRef}
          className={styles.canvas}
          width="1"
          height="1"
          onClick={(e) => handleCanvasClick(e)}
        >
          Your browser does not support the canvas element :((
        </canvas>
      </div>
    </Layout>
  );
}