
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let time = document.querySelector('#time')

function updateTime() {
  time.innerHTML = new Date().format("HH:MM \nddd d mmm")
}

window.addEventListener('click', e=> {
  time.style.color = randomColor()
})

const COLS = 30;
const ROWS = 20;

function randomChar() {
  return String.fromCharCode(Math.random() * 1000);
}

function Str(col) {
  this.col = col;
  let len = Math.floor(3 + Math.random() * (ROWS - 5));
  this.len = len;
  let top = -2*canvas.height;
  let speed = 20 + Math.random() * 30;
  let content = '';
  for (let i = 0; i < len; i++) {
    content += randomChar();
  }
  this.draw = _=> {
    let a = canvas.width / COLS;
    let b = canvas.height / ROWS;
    let x = col;
    let y = top;
    for (let i = 0; i < len; i++) {
      if (i == (len - 1)) {
        ctx.fillStyle = '#fff';
      } else if (i == (len - 2)) {
        ctx.fillStyle = '#ccc';
      } else if (i > len/2) {
        ctx.fillStyle = '#0f0';
      } else {
        ctx.fillStyle = '#060';
      }
      ctx.font = Math.floor(canvas.height / ROWS) + 'px s';
      ctx.fillText(content[i], a*x, y, a, b);
      y += b;
    }
    top += speed*(canvas.height / ROWS) / 100;
    if (top > canvas.height + b) {
      len = Math.floor(3 + Math.random() * (ROWS - 5));
      speed = 20 + Math.random() * 30;
      content = '';
      for (let i = 0; i < len; i++) {
        content += randomChar();
      }
      top = -(canvas.height + b);
    }
  };
}

let arr = [];

onresize = _=> {
 canvas.width = window.visualViewport.width;
 canvas.height = window.visualViewport.height;
 ctx.fillStyle = '#000';
 ctx.fillRect(0, 0, canvas.width, canvas.height);
};
onresize();

arr = [];

for (let i = 0; i < COLS; i++) {
  arr[i] = new Str(i);
}


function draw() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  arr.forEach((item, i) => {
    item.draw();
  });

  requestAnimationFrame(draw);
  updateTime()
}
draw();
