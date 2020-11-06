(function (){
  let loadModule = TGYBookmarkletThingLoadModule;
  /* magic numbers */

  const MAINCANVAS_ID = 'mainCanvas';
  const CLOSE_BUTTON_DIV_ID = 'closeButtonDiv';
  const SELECTOR_DIV_ID = 'selectorDiv';

  const SIZE_OF_SMALL_CANVASES = 100;
  const CLOSING_CANVAS_CROSS_PERCENTAGE = 0.8;
  const ARROW_BUTTONS_COLOR = '#999F';
  const BLOCK_BUTTONS_COLOR = '#FFFF';


  function Widget(modulePath, imagePath, name) {
    this.name = name;
    this.modulePath = modulePath;
    this.imagePath = imagePath;
    this.loaded = 0;
    this.load = _ => {
      if(!this.loaded) {
        loadModule(this.modulePath, 'js');
        this.loaded = 1;
      }
    };
  }


  let FAT_JSON = [];

  /* initialization */



  document.body.style.width = '100%';
  document.body.style.height = '100%';

  const mainCanvas = document.createElement('canvas');
  let isSelectorLaunched = 0;
  let isSelectorCreated = 0;
  let mainCanvasIsDown = 0;
  const closeButtonDiv = document.createElement('div');

  /* Add id to accept stylesheet */
  mainCanvas.id = MAINCANVAS_ID;
  mainCanvas.width = SIZE_OF_SMALL_CANVASES;
  mainCanvas.height = SIZE_OF_SMALL_CANVASES;

  closeButtonDiv.id = CLOSE_BUTTON_DIV_ID;
  closeButtonDiv.width = SIZE_OF_SMALL_CANVASES;
  closeButtonDiv.height = SIZE_OF_SMALL_CANVASES;


  document.body.appendChild(mainCanvas);
  document.body.appendChild(closeButtonDiv);


  closeButtonDiv.hidden = true;

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
    mainCanvas.style.top = '0px';
    mainCtx.clearRect(0, 0, w, h);
    drawTriangleDown(mainCtx,w/2+w/16,h/2+h/16,Math.min(w/2-w/8,h/2-h/8));
    drawBlocks(mainCtx,w/16,h/16,Math.min(w/2-w/8,h/2-h/8));
    mainCanvasIsDown = 0;
  }

  function makeDown(mainCtx,w,h) {
    mainCanvas.style.top = (Math.floor(window.visualViewport.height) - mainCanvas.height) + 'px';
    mainCtx.clearRect(0, 0, w, h);
    drawTriangleUp(mainCtx,w/2+w/16,h/16,Math.min(w/2-w/8,h/2-h/8));
    drawBlocks(mainCtx,w/16,h/2+h/16,Math.min(w/2-w/8,h/2-h/8));
    mainCanvasIsDown = 1;
  }



  function drawWidgets() {


  }

  function launchSelector() {
    if (!isSelectorLaunched) {
      console.log('selector launched');

      if (!isSelectorCreated) {
        selectorDiv = document.createElement('div');
        selectorDiv.id = SELECTOR_DIV_ID;
        document.body.appendChild(selectorDiv);
        isSelectorCreated = 1;
      }
      selectorDiv.hidden = false;

      selectorDiv.style.left = (mainCanvas.width + mainCanvas.offsetLeft + 3) + 'px';

      selectorDiv.style.width = Math.floor(window.visualViewport.width - closeButtonDiv.style.width - selectorDiv.offsetLeft - 2) + 'px';
      selectorDiv.style.height = Math.floor(window.visualViewport.height) - 3 + 'px';



      closeButtonDiv.hidden = false;

      drawWidgets();

      isSelectorLaunched = 1;
    } else {
      console.log('selector is already launced');
    }
  }
  function closeSelector() {
    if (isSelectorLaunched) {
      console.log('selector closed');
      selectorDiv.hidden = true;
      closeButtonDiv.hidden = true;
      isSelectorLaunched = 0;
    } else {
      console.log('couldn\'t find selector');
    }

  }

  function initClosingDiv() {
    ;
  }


  /* init pictures */
  makeUp(mainCtx,mainCanvas.width,mainCanvas.height);

  initClosingDiv();


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
    if (mainCanvasIsDown == 0) {
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
    } else if (mainCanvasIsDown == 1){
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

    if (!closeButtonDiv.hidden) {
      x = closeButtonDiv.offsetLeft - document.body.offsetLeft;
      y = closeButtonDiv.offsetTop - document.body.offsetTop;
      w = closeButtonDiv.width;
      h = closeButtonDiv.height;
      if(X>x && X<x+w) {
        if (Y>y && Y<y+h) {
          closeSelector();
          return 0;
        }
      }
    }
  });

  /* keydown handler */
  document.addEventListener('resize', e=>{
    if (selectorDiv.hidden == false) {
      selectorDiv.style.width = Math.floor(window.visualViewport.width - closeButtonDiv.style.width - selectorDiv.offsetLeft - 2) + 'px';
      selectorDiv.style.height = Math.floor(window.visualViewport.height) - 3 + 'px';
    }
  });

  /* Widgets */

  FAT_JSON[FAT_JSON.length] = new Widget('https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule.js', 'http://science.eu5.org/bookmarklets/general_tools/videoModule.png', 'videoModule');

  /*
  FAT_JSON.forEach(e => {
    e.load();
  });
  */


})();
