import { calculateNet } from "./NetClass";

export const resizeCanvasToDisplaySize = (canvas) => {
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
    // console.log(point);
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

const calcBox = (net) => {
  let boxWidth = 400;
  let boxHeight = 150;

  if (net.numLayers > 3) {
    boxWidth = net.numLayers * 100;
  }
  if (net.biggestLayer > 3) {
    boxHeight = net.biggestLayer * 50;
  }
  return { boxWidth, boxHeight };
};

const drawNet = (canvas, net) => {
  const ctx = canvas.getContext("2d");
  const { boxWidth, boxHeight } = calcBox(net);

  ctx.fillStyle = "rgba(0, 0, 0, 255)";
  ctx.fillRect(0, 0, boxWidth, boxHeight);
  ctx.strokeStyle = "white";
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
          // console.log(id, (boxHeight + id * boxHeight) / 3); // I hate js
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
      // console.log(neuron);
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

const drawNetInfluence = (canvas, net, interpolation) => {
  const ctx = canvas.getContext("2d");
  let width = canvas.width;
  let height = canvas.height;
  const originalWidth = width;
  const originalHeight = height;

  if (interpolation !== undefined) {
    width /= interpolation;
    height /= interpolation;
  }
  const centerX = width / 2;
  const centerY = height / 2;
  var imageData = ctx.createImageData(width, height);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const val = calculateNet(
        net,
        (x - centerX) / centerX,
        (y - centerY) / centerY
      );
      if (val > 0.5) {
        imageData.data[(x + y * width) * 4 + 0] = 0;
        imageData.data[(x + y * width) * 4 + 1] = 0;
        imageData.data[(x + y * width) * 4 + 2] = 255;
        imageData.data[(x + y * width) * 4 + 3] = 32;
      } else {
        imageData.data[(x + y * width) * 4 + 0] = 255;
        imageData.data[(x + y * width) * 4 + 1] = 0;
        imageData.data[(x + y * width) * 4 + 2] = 0;
        imageData.data[(x + y * width) * 4 + 3] = 32;
      }
    }
  }
  createImageBitmap(imageData).then((imageBitmap) => {
    ctx.drawImage(imageBitmap, 0, 0, originalWidth, originalHeight);
  });
};

export const draw = (canvas, net, points, showNet) => {
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
  drawNetInfluence(canvas, net, 1);
  // console.log(points);
  drawPoints(canvas, points);
  drawAxis(canvas);
  // console.log(showNet);
  if (showNet) {
    drawNet(canvas, net);
  }
};
