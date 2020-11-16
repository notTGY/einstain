(function(){
  /* Magic numbers */
  const OVERLAY_ID = 'overlay_video_module';
  const OVERLAY_HEIGHT = 50;
  const WRAPPER_ID = 'wrapper_video_module';
  const PROGRESS_BAR_ID = 'progress_bar_video_module';

  function ControlElement (fatherElement, imagePath, callback, style) {
    let elem;
    if (typeof(imagePath) == 'string') {
      elem = document.createElement('img');
      elem.src  = imagePath + '?' + new Date();
      fatherElement.appendChild(elem);
    } else {
      let tmp = imagePath(fatherElement);
      elem = tmp.elem;
      this.width = tmp.width;
      elem.width = tmp.width;
    }
    if (style) {
      Object.keys(style).forEach(e => {
        elem.style[e] = style[e];
      });
    }

    this.callback = callback;


    elem.addEventListener('click', this.callback);
    this.element = elem;
    this.remove = _ => {
      this.element.removeEventListener('click', this.callback);
      this.element.remove();
    };
  }

  function toggleGamma() {
    if (isGamma) {
      isGamma = false;
    } else {
      isGamma = true;
    }
  }




  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function wrap (toWrap, wrapper) {
    wrapper = wrapper || document.createElement('div');
    toWrap.parentNode.appendChild(wrapper);
    wrapper.appendChild(toWrap);
    return wrapper;
  };

  function killOverlay() {
    if (document.querySelector('#'+OVERLAY_ID)) {
      document.querySelector('#'+OVERLAY_ID).remove();
    }
  }


  function killThisScript() {
    let arr = document.querySelectorAll('script');
    arr.forEach(i => {
      let src = i.src;
      let ind = src.indexOf('?');
      if (ind != -1 && src.substring(ind-14,ind) == 'videoModule.js') {
        i.remove();
      }
    });
  }


  /* initialization and testing if there is a video element */
  let vidElem = document.querySelectorAll('video')[0];

  if (vidElem == undefined || vidElem == null) {
    let mainCanvas = document.querySelector('#mainCanvas');
    mainCanvas.hidden = false;
    killThisScript();
    return -2;
  }

  /* creating overlay */
  let overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  overlay.style.width = Math.floor(window.screen.width) + 'px';
  overlay.width = Math.floor(window.screen.width);
  overlay.height = OVERLAY_HEIGHT;
  overlay.style.height = OVERLAY_HEIGHT + 'px';
  overlay.style.visibility = 'visible';
  overlay.style.zIndex = '2147483647';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'space-between';
  overlay.style.alignItems = 'center';
  let overlayTimeout = 5;

  /* creating canvas to copy the video in*/
  let canvas = document.createElement('canvas');
  canvas.style.zIndex = '1';
  document.body.appendChild(canvas);

  /* creating wrap-around div */
  let wrapper = wrap(canvas);
  wrapper.id = WRAPPER_ID;
  wrapper.style.position = 'relative';
  insertAfter(canvas, overlay);



  let isGamma = false;


  /* fullscreen enter point and start of media */
  wrapper.requestFullscreen();
  canvas.width = window.screen.width;
  canvas.height = window.screen.height;

  let ctx = canvas.getContext('2d');
  let mainInterval = setInterval(()=>{
    ctx.drawImage(vidElem, 0, 0, canvas.width, canvas.height);
    /* Gamma drawing */
    if (isGamma) {
      let w = window.screen.width;
      let h = window.screen.height;
      let imageData = ctx.getImageData(0,0,w,h);
      console.log(imageData);
      imageData.data = imageData.data.map(x => {
        return x + 90;
      });
      console.log('second',imageData);
      ctx.putImageData(imageData, 0, 0);
    }
    /* overlay drawing */
    if (overlayTimeout < 0) {
      overlay.style.opacity = 0;
    } else {
      overlayTimeout -= .033;
    }
    /* progress bar updating */
    if (bar) {
      let str = 'linear-gradient(to right, #FFF 0%, #FF0 ';
      let prog = vidElem.currentTime / vidElem.duration;
      str += Math.floor(100*prog/2) + '%, #FFF ';
      str += Math.floor(100*prog) + '%, #FFF0 '
      str += Math.floor(100*prog) + 1 + '%, #FFF0 100%)';
      bar.style.background = str;
    }
  },33);


  let handler = e => {
    if (e.key == 'q') {
      document.exitFullscreen();
      let mainCanvas = document.querySelector('#mainCanvas');
      mainCanvas.hidden = false;
      clearInterval(mainInterval);
      killOverlay();
      killThisScript();
      canvas.remove();
      document.body.removeEventListener('keydown', handler);
      document.body.removeEventListener('mousemove', mousemoveHandler);
    }
  };
  document.body.addEventListener('keydown', handler);

  let mousemoveHandler = e => {
    if (e.clientY > window.screen.height - OVERLAY_HEIGHT) {
      overlayTimeout = +Infinity;
      overlay.style.opacity = 1;
    } else {
      overlayTimeout = 5;
      overlay.style.opacity = 1;
    }
  }
  document.body.addEventListener('mousemove', mousemoveHandler);


  /* creating widgets itself */
  let overlayLeft = document.createElement('div');
  let overlayRight = document.createElement('div');
  let overlayCenter = document.createElement('div');

  /* !!!!! order does matter */
  overlay.appendChild(overlayLeft);
  overlay.appendChild(overlayCenter);
  overlay.appendChild(overlayRight);

  let overlayControls = [];


  overlayControls[overlayControls.length] = new ControlElement(
    overlayLeft,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/playButtonVideoModule.png',
    e => {vidElem.play()},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlayLeft,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/pauseButtonVideoModule.png',
    e => {vidElem.pause()},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlayLeft,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/volumeDownButtonVideoModule.png',
    e => {vidElem.volume -= .1},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlayLeft,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/volumeUpButtonVideoModule.png',
    e => {vidElem.volume += .1},
    {margin: '5px', width: '40px', height:'40px'}
  );


  overlayControls[overlayControls.length] = new ControlElement(
    overlayLeft,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/jumpBackwardButtonVideoModule.png',
    e => {vidElem.currentTime -= 5},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlayRight,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/jumpForwardButtonVideoModule.png',
    e => {vidElem.currentTime += 5},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlayRight,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/speedDownButtonVideoModule.png',
    e => {vidElem.playbackRate -= .1},
    {margin: '5px', width: '40px', height:'40px'}
  );


  overlayControls[overlayControls.length] = new ControlElement(
    overlayRight,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/speedUpButtonVideoModule.png',
    e => {vidElem.playbackRate += .1},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlayRight,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/gammaButtonVideoModule.png',
    e=>{toggleGamma()},
    {margin: '5px', width: '40px', height:'40px', right: '5px'}
  );



  overlayControls[overlayControls.length] = new ControlElement(
    overlayRight,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/escapeButtonVideoModule.png',
    e=>{handler({key:'q'})},
    {margin: '5px', width: '40px', height:'40px', right: '5px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlayCenter,
    f => {
      let e = document.createElement('div');
      e.id = PROGRESS_BAR_ID;
      f.appendChild(e);
      return {elem: e , width: Math.floor(window.screen.width)-overlayControls.length*60};
    },
    e => {
      let element = document.querySelector('#'+PROGRESS_BAR_ID);
      let w = element.width;
      let dx = e.clientX - element.offsetLeft;
      vidElem.currentTime = vidElem.duration * (dx / w);
    },
    {margin: '5px', width: Math.floor(window.screen.width)-overlayControls.length*60+'px', height:'10px'}
  );


  const bar = document.querySelector('#'+PROGRESS_BAR_ID);

})();
