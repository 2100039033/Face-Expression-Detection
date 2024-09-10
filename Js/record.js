let mediaRecorder;
let recordedChunks = [];

document.getElementById('recordButton').addEventListener('click', function () {
  startRecording();
});

document.getElementById('stopButton').addEventListener('click', function () {
  stopRecording();
});

function startRecording() {
  recordedChunks = [];
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(video.srcObject, options);

  mediaRecorder.ondataavailable = function (e) {
    if (e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  mediaRecorder.onstop = function () {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recording.webm';
    a.click();
  };

  mediaRecorder.start();
  document.getElementById('recordButton').disabled = true;
  document.getElementById('stopButton').disabled = false;
}

function stopRecording() {
  mediaRecorder.stop();
  document.getElementById('recordButton').disabled = false;
  document.getElementById('stopButton').disabled = true;
}
