document.getElementById('upload-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData();
  const fileInput = document.getElementById('imageFile');
  formData.append('file', fileInput.files[0]);

  const response = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const result = await response.json();
  document.getElementById('result').innerText = `Detected expression: ${result.expression}`;
});
