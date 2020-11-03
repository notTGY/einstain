/* magic numbers */

const MAINCANVAS_ID = 'mainCanvas';
const MAINCANVASDOWN_ID = 'mainCanvas_down';
const CLOSE_BUTTON_CANVAS_ID = 'close_button_canvas';
const SELECTOR_CANVAS_ID = 'selector_canvas';

const SIZE_OF_SMALL_CANVASES = 100;
const CLOSING_CANVAS_CROSS_PERCENTAGE = 0.8;
const ARROW_BUTTONS_COLOR = '#999F';
const BLOCK_BUTTONS_COLOR = '#FFFF';


/* initialization */
const mainCanvas = document.createElement('canvas');
let is_selector_launched = 0;
let is_selector_created = 0;
const close_button_canvas = document.createElement('canvas');

/* Add id to accept stylesheet */
mainCanvas.id = MAINCANVAS_ID;
mainCanvas.width = SIZE_OF_SMALL_CANVASES;
mainCanvas.height = SIZE_OF_SMALL_CANVASES;

close_button_canvas.id = CLOSE_BUTTON_CANVAS_ID;
close_button_canvas.hidden = true;

document.body.appendChild(mainCanvas);
document.body.appendChild(close_button_canvas);

const mainCtx = mainCanvas.getContext('2d');


/*dependency functions*/

/* draws light-gray triangle on the given ctx, at given coords, s is size of each side
x and y are coords of top left corner */
function drawTriangleDown(ctx,x,y,s) {
  ctx.fillStyle = ARROW_BUTTONS_COLOR;
  ctx.beginPath();
  ctx.moveTo(x,y);
  ctx.lineTo(x + s,y);
  ctx.lineTo(x + s/2, y + s*Math.sqrt(3)/2);
  ctx.fill();
}
/* draws light-gray triangle on the given ctx, at given coords, s is size of each side
x and y are coords of top left corner */
function drawTriangleUp(ctx,x,y,s) {
  ctx.fillStyle = ARROW_BUTTONS_COLOR;
  ctx.beginPath();
  ctx.moveTo(x + s/2, y);
  ctx.lineTo(x,y + s*Math.sqrt(3)/2);
  ctx.lineTo(x + s,y + s*Math.sqrt(3)/2);
  ctx.fill();
}
function drawBlocks(ctx,x,y,s) {
  ctx.fillStyle = BLOCK_BUTTONS_COLOR;
  ctx.fillRect(x,y,s/5,s/5);
  ctx.fillRect(x+2*s/5,y,s/5,s/5);
  ctx.fillRect(x+4*s/5,y,s/5,s/5);
  ctx.fillRect(x,y+2*s/5,s/5,s/5);
  ctx.fillRect(x+2*s/5,y+2*s/5,s/5,s/5);
  ctx.fillRect(x+4*s/5,y+2*s/5,s/5,s/5);
  ctx.fillRect(x,y+4*s/5,s/5,s/5);
  ctx.fillRect(x+2*s/5,y+4*s/5,s/5,s/5);
  ctx.fillRect(x+4*s/5,y+4*s/5,s/5,s/5);
}

function makeUp(mainCtx,w,h) {
  mainCanvas.id = MAINCANVAS_ID;
  mainCtx.clearRect(0, 0, w, h);
  drawTriangleDown(mainCtx,w/2+w/16,h/2+h/16,Math.min(w/2-w/8,h/2-h/8));
  drawBlocks(mainCtx,w/16,h/16,Math.min(w/2-w/8,h/2-h/8));
}

function makeDown(mainCtx,w,h) {
    mainCanvas.id = MAINCANVASDOWN_ID;
    mainCtx.clearRect(0, 0, w, h);
    drawTriangleUp(mainCtx,w/2+w/16,h/16,Math.min(w/2-w/8,h/2-h/8));
    drawBlocks(mainCtx,w/16,h/2+h/16,Math.min(w/2-w/8,h/2-h/8));
}

function launchSelector() {
  if (!is_selector_launched) {
    console.log('selector launched');

    if (!is_selector_created) {
      selector_canvas = document.createElement('canvas');
      selector_canvas.id = SELECTOR_CANVAS_ID;
      document.body.appendChild(selector_canvas);
      is_selector_created = 1;
    }
    selector_canvas.hidden = false;

    selector_canvas.style.left = mainCanvas.width + mainCanvas.offsetLeft;

    close_button_canvas.hidden = false;

    selector_canvas.width = window.innerWidth - selector_canvas.offsetLeft;
    selector_canvas.height = window.innerHeight;



    close_button_canvas.width = SIZE_OF_SMALL_CANVASES;
    close_button_canvas.height = SIZE_OF_SMALL_CANVASES;

    close_button_canvas.style.top = 0;
    with(close_button_canvas) {
      style.left = window.innerWidth - width;
    }


    is_selector_launched = 1;
  } else {
    console.log('selector is already launced');
  }
}
function closeSelector() {
  if (is_selector_launched) {
    console.log('selector closed');
    selector_canvas.hidden = true;
    close_button_canvas.hidden = true;
    is_selector_launched = 0;
  } else {
    console.log('couldn\'t find selector');
  }

}

function initClosingCanvas() {
    let ctx = close_button_canvas.getContext('2d');
    let k = CLOSING_CANVAS_CROSS_PERCENTAGE;
    let w = close_button_canvas.width;
    let h = close_button_canvas.height;
    let x0 = w/2-k*w/2;
    let y0 = h/2-k*h/2;
    let x1 = w/2+k*w/2;
    let y1 = h/2+k*h/2;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0,y0);
    ctx.lineTo(x1,y1);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x0,y1);
    ctx.lineTo(x1,y0);
    ctx.stroke();
}


/* init pictires */
makeUp(mainCtx,mainCanvas.width,mainCanvas.height);

initClosingCanvas();


/* Click handler */
document.addEventListener('click', e=>{
  const mainCtx = mainCanvas.getContext('2d');
  let x = mainCanvas.offsetLeft - document.body.offsetLeft;
  let y = mainCanvas.offsetTop - document.body.offsetTop;
  let w = mainCanvas.width;
  let h = mainCanvas.height;
  const id = mainCanvas.id;
  const X = e.clientX;
  const Y = e.clientY;
  if (id == MAINCANVAS_ID) {
    /* check if we need to move this thing down */
    if (X <= x+w && Y <= y+h) {
      if (X > x+w/2 && Y > y+h/2) {
        makeDown(mainCtx,w,h);
        return 0;
      }
    }
    if (X <= x+w/2 && Y <= y+h/2) {
      if (X > x && Y > y) {
        launchSelector();
        return 0;
      }
    }
    /* other buttons */
  } else if (id == MAINCANVASDOWN_ID){
    /* check if we need to move this thing up */
    if (X <= x+w && Y <= y+h/2) {
      if (X > x+w/2 && Y > y) {
        makeUp(mainCtx,w,h);
        return 0;
      }
    }
    if (X <= x+w/2 && Y <= y+h) {
      if (X > x && Y > y+h/2) {
        launchSelector();
        return 0;
      }
    }
    /* other buttons */
  }
  x = close_button_canvas.offsetLeft - document.body.offsetLeft;
  y = close_button_canvas.offsetTop - document.body.offsetTop;
  w = close_button_canvas.width;
  h = close_button_canvas.height;
  if (!close_button_canvas.hidden) {
    if(X>x && X<x+w) {
      if (Y>y && Y<y+h) {
        closeSelector();
        return 0;
      }
    }
  }
});

/* keydown handler */
document.addEventListener('keydown', e=>{
  ;
});
