const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const resultElement = document.getElementById('result');

// Load model
async function loadModel() {
  const model = await tf.loadGraphModel('models/model.json');
  return model;
}

// Start webcam
async function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => {
      video.srcObject = stream;
    });
}

// Perform detection
async function detectExpression(model) {
  setInterval(async () => {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const predictions = await model.detect(canvas);
    if (predictions.length > 0) {
      resultElement.innerText = `Detected expression: ${predictions[0].expression}`;
    } else {
      resultElement.innerText = 'No face detected';
    }
  }, 100);
}

video.addEventListener('loadeddata', async () => {
  const model = await loadModel();
  detectExpression(model);
});

startVideo();
