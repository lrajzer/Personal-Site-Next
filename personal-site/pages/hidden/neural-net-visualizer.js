import styles from "../../styles/NeuralNets.module.css";
import Layout from "../../components/Layout";
import {
  NeuralNet,
  Point,
  Neuron,
  generatePoints,
  createNeuronPanel,
} from "../../components/hidden/NetClass";
import { draw, calcBox } from "../../components/hidden/NetDrawing";
import { useRef, useEffect, useState } from "react";

/**
 * Converts left top corner coords to axis coords
 * @param {*} x
 * @param {*} y
 */
const getAxisCords = (x, y, height, width) => {
  let newX = x - width / 2;
  let newY = y - height / 2;

  return { newX, newY };
};

const handleCanvasClick = (
  canvas,
  e,
  showNet,
  net,
  setNet,
  points,
  setPoints,
  setEditingNet,
  setNeuronToEdit
) => {
  const rect = canvas.current.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  console.log(`Clicked on x: ${x}, y: ${y}`);
  if (showNet) {
    const netBox = calcBox(net);
    if (x < netBox["boxWidth"] && y < netBox["boxHeight"]) {
      net.neurons.forEach((neuron) => {
        if (!(neuron.isOutput || neuron.isInput)) {
          if (
            Math.abs(
              x -
                (netBox["boxWidth"] / 2 -
                  net.numLayers * 35 +
                  neuron.layer * 70 -
                  35)
            ) < 20 &&
            Math.abs(
              y -
                (netBox["boxHeight"] / 2 -
                  net.biggestLayer * 25 +
                  neuron.index * 50 +
                  25)
            ) < 20
          ) {
            setEditingNet(true);
            setNeuronToEdit(neuron);
          }
        } else if (neuron.isOutput) {
          if (
            Math.abs(x - (netBox["boxWidth"] - 50)) < 20 &&
            Math.abs(y - netBox["boxHeight"] / 2) < 20
          ) {
            setEditingNet(true);
            setNeuronToEdit(neuron);
          }
        }
      });
      return;
    }
  }
  const { newX, newY } = getAxisCords(
    x,
    y,
    canvas.current.height,
    canvas.current.width
  );
  let inserted = false;
  points.forEach((point, idx) => {
    console.log(point, idx);
    if (
      Math.abs(point.x - newX) * Math.abs(point.x - newX) +
        Math.abs(point.y - newY) * Math.abs(point.y - newY) <
      100
    ) {
      console.log("Removing point");
      setPoints(points.filter((_, i) => i !== idx));
    }
  });
  setPoints([...points, new Point(newX, newY, 0)]);
};

export default function NeuralNetVisualizer() {
  const [actFunc, setActFunc] = useState("linear");
  const [net, setNet] = useState(
    new NeuralNet([
      new Neuron(
        false,
        true,
        0,
        -2,
        { 0: 1, 1: 1, 2: 0, 3: 0 },
        -0.6,
        "sigmoid"
      ),
      new Neuron(false, false, 0, 1, { 0: 1, 1: -1 }, 0.5, "sigmoid"),
      new Neuron(false, false, 1, 1, { 0: 1, 1: 0 }, 0, "relu"),
      new Neuron(false, false, 2, 1, { 0: 1, 1: 0 }, 0, "relu"),
      new Neuron(false, false, 3, 1, { 0: 1, 1: 0 }, 0, "relu"),
      new Neuron(true, false, 0, -1),
      new Neuron(true, false, 1, -1),
    ])
  );
  const [neuronToEdit, setNeuronToEdit] = useState(null);
  const [points, setPoints] = useState(generatePoints(10, 2, 100, 100));
  const [showNet, setShowNet] = useState(true);
  const [editingNet, setEditingNet] = useState(false);
  const [shouldRedraw, setShouldRedraw] = useState(false);

  const canvasRef = useRef();

  useEffect(() => {
    console.log("something changed, redrawing call");
    const canvas = canvasRef.current;
    draw(canvas, net, points, showNet);
    window.addEventListener("resize", () => {
      const canvas = canvasRef.current;
      draw(canvas, net, points, showNet);
    });
  }, [showNet, net, points]);

  useEffect(() => {
    console.log("redrawing call");
    if (shouldRedraw) {
      setShouldRedraw(false);
    }
    const canvas = canvasRef.current;
    draw(canvas, net, points, showNet);
  }, [shouldRedraw]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Layout
      title="Neural net visualizer"
      description="Neural net visualizer made entirely in Javascript."
      isMonoLang={true}
    >
      <div className={styles.content}>
        <h1>Neural net visualizer</h1>
        <h1>!!!This is a WIP!!!</h1>

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
        <div className={styles.canvasWrapper}>
          {createNeuronPanel(
            editingNet,
            net,
            setNet,
            neuronToEdit,
            setEditingNet,
            setShouldRedraw
          )}

          <canvas
            ref={canvasRef}
            className={styles.canvas}
            width="1"
            height="1"
            onClick={(e) =>
              handleCanvasClick(
                canvasRef,
                e,
                showNet,
                net,
                setNet,
                points,
                setPoints,
                setEditingNet,
                setNeuronToEdit
              )
            }
            onContextMenu={(e) => {
              e.preventDefault();
              console.log("left click");
            }}
          >
            Your browser does not support the canvas element :((
          </canvas>
        </div>
        <p className={styles.bottomText}>
          This is a neural net visualizer made entirely in Javascript. It uses
          the HTML5 canvas element to draw the neural net and the points. The
          neural net is a simple 2-layer neural net with 2 inputs and 1 output.
          <br />
          You can add more layers and neurons to the neural net by clicking the
          &quot;Add layer&quot; and &quot;Add neuron&quot; buttons.
          <br />
          You can also generate random points by clicking the &quot;Generate
          points&quot; button.
          <br />
          You can move neurons to different layers by dragging them, and you can
          change their weights by clicking on them.
          <br />
          You can add and delete points by clicking on them and on the canvas.
        </p>
      </div>
    </Layout>
  );
}
