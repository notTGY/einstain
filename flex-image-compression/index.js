const SIZE = 480
const input = document.querySelector('input')
const output = document.querySelector('#output')
const canvas1 = document.querySelector('#before')
const ctx1 = canvas1.getContext('2d')
canvas1.width = SIZE
canvas1.height = SIZE

const canvas2 = document.querySelector('#after')
const ctx2 = canvas2.getContext('2d')
canvas2.width = SIZE
canvas2.height = SIZE

let image

function runCompression() {
  let outputData = new Uint8Array(SIZE*SIZE*3)
  const imageData = ctx1.getImageData(0,0,SIZE,SIZE)
  const data = imageData.data
  for (let i = 0; i < data.length / 4; i++) {
    const r = data[i*4]
    const g = data[i*4+1]
    const b = data[i*4+2]
    const o = data[i*4+3]
    const rm = r/4|0
    const gm = g/4|0
    const bm = b/4|0
    const om = o/4|0
    outputData[i*3] = rm*4 + gm/16|0
    outputData[i*3+1] = (gm%16)*16 + bm/4|0
    outputData[i*3+2] = (bm%4)*64 + om
  }
  image = outputData
  console.log('['+image+']')
  displayCompression()
  downloadBlob(image, 'image.flx', 'image/flex')
}

function displayCompression() {
  const imageData = ctx2.createImageData(SIZE, SIZE)
  for (let i = 0; i < imageData.data.length / 4; i++ ) {
    const a = image[i*3]
    const b = image[i*3+1]
    const c = image[i*3+2]
    imageData.data[i*4 + 0] = (a/4|0)*4;
    imageData.data[i*4 + 1] = ((a%4)*16+(b/16|0))*4;
    imageData.data[i*4 + 2] = ((b%16*4)+(c/64|0))*4;
    imageData.data[i*4 + 3] = (c%64)*4;
  }
  ctx2.putImageData(imageData, 0, 0);
}


input.onchange = e => {
  const file = e.target.files[0]
  const objectURL = URL.createObjectURL(file)
  const img = document.createElement('img')
  img.src = objectURL
  img.onload = e => {
    ctx1.clearRect(0,0,SIZE,SIZE)
    if (img.width >= img.height) {
      ctx1.drawImage(img, 0, 0, SIZE, SIZE*img.height/img.width)
    } else {
      ctx1.drawImage(img, 0, 0, SIZE*img.width/img.height, SIZE)
    }
    runCompression()
  }
}

function downloadBlob(data, fileName, mimeType) {
  const blob = new Blob([data], {
    type: mimeType
  });
  const url = window.URL.createObjectURL(blob);
  //downloadURL(url, fileName);
}

function downloadURL(data, fileName) {
  const a = document.createElement('a');
  a.href = data;
  a.download = fileName;
  document.body.appendChild(a);
  a.style = 'display: none';
  a.click();
  a.remove();
}
