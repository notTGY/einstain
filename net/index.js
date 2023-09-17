const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = 1920;
const height = canvas.height = 1080;

const X = 40;
const Y = 30;

const COLORS = {
  0: '#fff',
  1: '#000',
  2: '#d2b48c',
}
ctx.strokeStyle = '#'
const paint = (x, y, color) => {
  ctx.fillStyle = COLORS[color]
  const hx = width / X;
  const hy = height / Y;
  ctx.fillRect(hx * x, hy * y, hx, hy);
  ctx.strokeRect(hx * x, hy * y, hx, hy);
}

const initial = []
for (let i = 0; i < X; i++) {
  initial[i] = []
  for (let j = 0; j < Y; j++) {
    let color = 0;
    if (
      (i === 1 || i === X - 2) && (j >= 1 && j <= Y - 2)
      || (j === 1 || j === Y - 2) && (i >= 1 && i <= X - 2)
    ) {
      color = 1;
    }
    initial[i][j] = color;
    paint(i, j, initial[i][j]);
  }
}

canvas.addEventListener('click', (e) => {
  const x = Math.floor(e.offsetX / canvas.offsetWidth * X)
  const y = Math.floor(e.offsetY / canvas.offsetHeight * Y)
  startCalculation(x, y)
})

let count = 0
async function startCalculation(x, y) {
  count++
  if (x < 0 || y < 0 || x >= X || y >= Y) return

  paint(x, y, 2);
  initial[x][y] = 2;
  const next = [[x+1, y], [x-1, y], [x, y+1], [x, y-1]]
  next.forEach(field => {
    const [i, j] = field
    if (initial[i][j] === 0) startCalculation(i, j)
  })
}


