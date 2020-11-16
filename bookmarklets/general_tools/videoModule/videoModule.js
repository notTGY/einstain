(function(){
  /* Magic numbers */
  const OVERLAY_ID = 'overlay_video_module';
  const OVERLAY_HEIGHT = 50;
  const WRAPPER_ID = 'wrapper_video_module';
  const PROGRESS_BAR_ID = 'progress_bar_video_module';
  const PLAY_BUTTON_ID = 'play_button_video_module';
  const OTHER_OVERLAY_CLASS = 'other_overlay_class_video_module';
  const CLOCK_INPUT_ID = 'clock_input_video_module';


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
      document.querySelectorAll('.'+OTHER_OVERLAY_CLASS).forEach(e=>e.remove());
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


  /* gamma setting variable */
  let isGamma = false;

  /* defining clock overlay */
  let clockOverlay = document.createElement('div');
  clockOverlay.classList.add(OTHER_OVERLAY_CLASS);
  clockOverlay.style.top = '10px';
  clockOverlay.style.left = '10px';
  clockOverlay.style.width = '200px';
  clockOverlay.style.height = '50px';
  clockOverlay.style.border = '1px solid #FFFE';
  clockOverlay.style.background = 'radial-gradient(#0008, #FFFC)';
  clockOverlay.hidden = false;

  wrapper.appendChild(clockOverlay);

  let clockDropdownOverlay = document.createElement('div');
  clockDropdownOverlay.classList.add(OTHER_OVERLAY_CLASS);
  clockDropdownOverlay.style.top = '60px';
  clockDropdownOverlay.style.left = '10px';
  clockDropdownOverlay.style.width = '200px';
  clockDropdownOverlay.style.height = '200px';
  clockDropdownOverlay.style.border = '1px solid #FFFE';
  clockDropdownOverlay.style.background = 'radial-gradient(#0008, #FFFC)';
  clockDropdownOverlay.hidden = true;

  wrapper.appendChild(clockDropdownOverlay);


  let inputField = document.createElement('input');
  inputField.type = 'time';
  
  let hours = (new Date()).getHours();
  let minutes = (new Date()).getMinutes();
  let seconds = (new Date()).getSeconds();
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  inputField.placeholder = '' + hours + ':' + minutes;

  inputField.id = CLOCK_INPUT_ID;
  

  /* clock initializations */  
  const clockOverlayOnclick = e => {
    if (clockDropdownOverlay.hidden) {
      clockDropdownOverlay.hidden = false;
      inputField.hidden = false;
    } else {
      clockDropdownOverlay.hidden = true;
      inputField.hidden = true;
    }
  };

  
  clockOverlay.addEventListener('click', clockOverlayOnclick);



  /* Dual-watch and timer watch settings initialization */
  let startTime = {hours: undefined, minutes: undefined};

  const inputFieldOnchange = e => {
    let value = inputField.value;
    startTime.hours = value.substring(0,2);
    startTime.minutes = value.substring(3,5);
  };


  inputField.addEventListener('change', inputFieldOnchange);

  /* fullscreen enter point and start of media */
  wrapper.requestFullscreen();
  canvas.width = window.screen.width;
  canvas.height = window.screen.height;

  let ctx = canvas.getContext('2d');
  
  let mainInterval = 1;
  
  const mainIntervalFunction = ()=>{
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
      clockDropdownOverlay.hidden = true;
      clockOverlay.hidden = true;
      inputField.hidden = true;
    } else {
      overlayTimeout -= .033;
    }
    /* clock updater */
    let hours = (new Date()).getHours();
    let minutes = (new Date()).getMinutes();
    let seconds = (new Date()).getSeconds();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    clockOverlay.innerHTML = '' + hours + ':' + minutes;
    /* Timing start function */
    if (startTime.hours != undefined && startTime.minutes != undefined) {
      let isPlaying = (vidElem.currentTime > 0 && !vidElem.paused && !vidElem.ended && vidElem.readyState > 2);
      if (startTime.hours*60+startTime.minutes >= hours*60+minutes) {
        if (!isPlaying) {
          hookPlayButton(); 
        }     
      } else {
        if (isPlaying) {
          hookPlayButton();
        }
      }
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
    if (mainInterval) {
      requestAnimationFrame(mainIntervalFunction);
    }
  };


  mainIntervalFunction();


  let handler = e => {
    if (e.key == 'q') {
      document.exitFullscreen();
      let mainCanvas = document.querySelector('#mainCanvas');
      mainCanvas.hidden = false;
      mainInterval = 0;
      document.body.removeEventListener('keydown', handler);
      document.body.removeEventListener('mousemove', mousemoveHandler);
      clockOverlay.removeEventListener('click', clockOverlayOnclick);
      inputField.removeEventListener('change', inputFieldOnchange);
      canvas.remove();
      killOverlay();
      killThisScript();
    }
  };
  document.body.addEventListener('keydown', handler);

  let mousemoveHandler = e => {
    let inDownOverlay = (e.clientY > window.screen.height - OVERLAY_HEIGHT);
    let isClockOverlay = (e.clientY > 10 && e.clientY < 310 && e.clientX < 210 && e.clientX > 10);
    if (isDownOverlay || isClockOverlay) {
      overlayTimeout = +Infinity;
      overlay.style.opacity = 1;
      clockOverlay.hidden = false;
    } else {
      overlayTimeout = 5;
      overlay.style.opacity = 1;
      clockOverlay.hidden = false;
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
    f => {
      let e = document.createElement('img');
      e.id = PLAY_BUTTON_ID;
      e.src = 'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/playButtonVideoModule.png';
      f.appendChild(e);
      return {elem: e , width: 40};
    },
    hookPlayButton = e => {
      let element = document.querySelector('#'+PLAY_BUTTON_ID);
      if (vidElem.currentTime > 0 && !vidElem.paused && !vidElem.ended && vidElem.readyState > 2) {
        vidElem.play();
        element.src = 'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/pauseButtonVideoModule.png?'+new Date();
      } else {
        vidElem.pause();
        element.src = 'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/playButtonVideoModule.png?'+new Date();
      }
    },
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
