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
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'center';
  wrapper.style.alignItems = 'center';
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
  clockOverlay.style.width = '90px';
  clockOverlay.style.height = '20px';
  clockOverlay.style.border = '1px solid #FFFE';
  clockOverlay.style.background = 'radial-gradient(#0008, #000C)';
  clockOverlay.style.textAlign = 'center';
  clockOverlay.style.opacity = 1;
  clockOverlay.style.color = '#FFF';

  wrapper.appendChild(clockOverlay);

  let clockDropdownOverlay = document.createElement('div');
  clockDropdownOverlay.classList.add(OTHER_OVERLAY_CLASS);
  clockDropdownOverlay.style.top = '30px';
  clockDropdownOverlay.style.left = '10px';
  clockDropdownOverlay.style.width = '90px';
  clockDropdownOverlay.style.height = '40px';
  clockDropdownOverlay.style.border = '1px solid #FFFE';
  clockDropdownOverlay.style.background = 'radial-gradient(#0008, #000C)';
  clockDropdownOverlay.style.display = 'flex';
  clockDropdownOverlay.style.alignItems = 'center';
  clockDropdownOverlay.style.justifyContent = 'center';
  clockDropdownOverlay.style.opacity = 0;

  wrapper.appendChild(clockDropdownOverlay);

  /* time input field*/
  let inputField = document.createElement('input');
  inputField.type = 'time';
  
  let inputFieldResetButton = document.createElement('button');
  inputFieldResetButton.style.width = '5px';
  inputFieldResetButton.style.height = '5px';
  inputFieldResetButton.width = 5;
  inputFieldResetButton.height = 5;


  const inputFieldResetButtonOnclick = _ => {
    inputField.value = '';
    startTime = {hours: undefined, minutes: undefined};
    countdownOverlay.style.opacity = 0;
  };
  
  inputField.id = CLOCK_INPUT_ID;
  
  clockDropdownOverlay.appendChild(inputField);
  clockDropdownOverlay.appendChild(inputFieldResetButton);
  /* clock initializations */  
  const clockOverlayOnclick = e => {
    if (clockDropdownOverlay.style.opacity == 0) {
      clockDropdownOverlay.style.opacity = 1;
      inputField.style.opacity = 1;
      inputFieldResetButton.style.opacity = 1;
    } else {
      clockDropdownOverlay.style.opacity = 0;
      inputField.style.opacity = 0;
      inputFieldResetButton.style.opacity = 0;
    }
  };

  
  clockOverlay.addEventListener('click', clockOverlayOnclick);



  /* Dual-watch and timer watch settings initialization */
  let startTime = {hours: undefined, minutes: undefined};

  const inputFieldOnchange = e => {
    let value = inputField.value;
    startTime.hours = Number(value.substring(0,2));
    startTime.minutes = Number(value.substring(3,5));
  };


  inputField.addEventListener('change', inputFieldOnchange);

  inputFieldResetButton.addEventListener('click', inputFieldResetButtonOnclick);



  /* countdown overlay initialization */

  let countdownOverlay = document.createElement('div');
  countdownOverlay.classList.add(OTHER_OVERLAY_CLASS);
  countdownOverlay.style.width = '300px';
  countdownOverlay.style.height = '100px';
  countdownOverlay.style.border = '1px solid #FFFE';
  countdownOverlay.style.background = 'radial-gradient(#0008, #000C)';
  countdownOverlay.style.display = 'flex';
  countdownOverlay.style.justifyContent = 'center';
  countdownOverlay.style.alignItems = 'center';
  countdownOverlay.style.textAlign = 'center';
  countdownOverlay.style.top = Math.floor(window.screen.height/2 - 50)+'px';
  countdownOverlay.style.left = Math.floor(window.screen.width/2 - 150)+'px';
  countdownOverlay.style.color = '#FFF';

  wrapper.appendChild(countdownOverlay);
  countdownOverlay.style.opacity = 0;

  function displayTimeLeft() {
    let str = '-';
    let t = new Date();
    let h = t.getHours();
    let m = t.getMinutes();
    let s = t.getSeconds();
    let time = (h - startTime.hours)*60*60 + (m - startTime.minutes)*60 + s;
    time = -time;
    h = Math.floor(time/(60*60));
    m = Math.floor((time - 60*60*h)/60);
    s = Math.floor(time - 60*60*h - 60*m);
    if (h < 10) {
      h = '0' + h;
    }
    str += h;
    str += ':';
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    str += m;
    str += ':';
    str += s;
    countdownOverlay.style.opacity = 1;
    countdownOverlay.innerHTML = str;
  }


  /* better progress bar */

  let betterProgressBar = document.createElement('div');
  betterProgressBar.classList.add(OTHER_OVERLAY_CLASS);
  betterProgressBar.style.opacity = 0;
  betterProgressBar.style.width = Math.floor(window.screen.width) + 'px';
  betterProgressBar.style.height = '4px';
  betterProgressBar.style.left = '0px';
  betterProgressBar.style.bottom = '0px';

  wrapper.appendChild(betterProgressBar);

  function drawBetterProgressBar() {
    let str = 'linear-gradient(to right, #FFF 0%, #FF0 ';
    let prog = vidElem.currentTime / vidElem.duration;
    str += Math.floor(1000*prog/2)/10 + '%, #FFF ';
    str += Math.floor(1000*prog)/10 + '%, #FFF0 '
    str += Math.floor(1000*prog)/10 + 1 + '%, #FFF0 100%)';
    betterProgressBar.style.background = str;
  }


  /* fullscreen enter point and start of media */
  wrapper.requestFullscreen();
  let w = vidElem.videoWidth;
  let h = vidElem.videoHeight;
  if (h < w) {
    canvas.height = window.screen.height;
    canvas.width = canvas.height * (w/h);
  } else {
    canvas.width = window.screen.width;
    canvas.height = canvas.width * (h/w);
  }
  let ctx = canvas.getContext('2d');
  
  let mainInterval = 1;
  
  const mainIntervalFunction = ()=>{
    ctx.drawImage(vidElem, 0, 0, canvas.width, canvas.height);

    /* Gamma drawing */
    if (isGamma) {
      let w = canvas.width;
      let h = canvas.height;
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
      clockDropdownOverlay.style.opacity = 0;
      clockOverlay.style.opacity = 0;
      inputField.style.opacity = 0;
      inputFieldResetButton.style.opacity = 0;
    } else {
      overlayTimeout -= .033;
    }
    /* better progress bar drawer */
    if (betterProgressBar.style.opacity == 1) {
      drawBetterProgressBar();
    }
    /* clock updater */
    let hours = (new Date()).getHours();
    let minutes = (new Date()).getMinutes();
    let seconds = (new Date()).getSeconds();
    let tmp_minutes = minutes;
    if (minutes < 10) {
      tmp_minutes = '0' + minutes;
    }
    clockOverlay.innerHTML = '' + hours + ':' + tmp_minutes;
    /* Timing start function */
    if (startTime.hours != undefined && startTime.minutes != undefined) {
      let isPlaying = (vidElem.currentTime > 0 && !vidElem.paused && !vidElem.ended && vidElem.readyState > 2);
      let logic = (startTime.hours*60+startTime.minutes > hours*60+minutes);
      if (!logic) {
        if (!isPlaying) {
          countdownOverlay.style.opacity = 0;
          hookPlayButton(); 
        }     
      } else {
        displayTimeLeft();
        if (isPlaying) {
          hookPlayButton();
        }
      }
    }
    /* progress bar updating */
    if (bar) {
      let str = 'linear-gradient(to right, #FFF 0%, #FF0 ';
      let prog = vidElem.currentTime / vidElem.duration;
      str += Math.floor(1000*prog/2)/10 + '%, #FFF ';
      str += Math.floor(1000*prog)/10 + '%, #FFF0 '
      str += Math.floor(1000*prog)/10 + 1 + '%, #FFF0 100%)';
      bar.style.background = str;
    }
    if (mainInterval) {
      requestAnimationFrame(mainIntervalFunction);
    }
  };


  

  let handler = e => {
    if (e.key == 'q' || e.key == 'й') {
      document.exitFullscreen();
      let mainCanvas = document.querySelector('#mainCanvas');
      mainCanvas.hidden = false;
      mainInterval = 0;
      document.body.removeEventListener('keydown', handler);
      document.body.removeEventListener('mousemove', mousemoveHandler);
      clockOverlay.removeEventListener('click', clockOverlayOnclick);
      inputField.removeEventListener('change', inputFieldOnchange);
      inputFieldResetButton.removeEventListener('click', inputFieldResetButtonOnclick);
      canvas.remove();
      killOverlay();
      killThisScript();
    } else if (e.key == 'ArrowLeft') {
      vidElem.currentTime -= 5;
    } else if (e.key == 'ArrowRight') {
      vidElem.currentTime += 5;
    } else if (e.key == 'ArrowUp') {
      vidElem.volume += .1;
    } else if (e.key == 'ArrowDown') {
      vidElem.volume -= .1;
    } else if (e.key == '>' || e.key == '.' || e.key == 'ю') {
      vidElem.playbackRate += .1
    } else if (e.key == '<' || e.key == ',' || e.key == 'б') {
      vidElem.playbackRate -= .1
    } else if (e.key == ' ') {
      hookPlayButton();
    } else if (e.key == 't' || e.key == 'е') {
      if(betterProgressBar.style.opacity == 1) {
        betterProgressBar.style.opacity = 0;
      } else {
        betterProgressBar.style.opacity = 1;
      }
    }

  };
  document.body.addEventListener('keydown', handler);

  let prevX = 0;
  let prevY = 0;

  let mousemoveHandler = e => {
    let dx = e.clientX - prevX;
    let dy = e.clientY - prevY;
    let dl = dx*dx + dy*dy;
    if (dl > 5) {
      let isDownOverlay = (e.clientY > (window.screen.height - OVERLAY_HEIGHT)?1:0);
      let isClockOverlay = (e.clientY > 10 && e.clientY < 310 && e.clientX < 210 && e.clientX > 10)?1:0;
      if (isDownOverlay || isClockOverlay) {
        overlayTimeout = +Infinity;
        overlay.style.opacity = 1;
        clockOverlay.style.opacity = 1;
      } else {
        overlayTimeout = 5;
        overlay.style.opacity = 1;
        clockOverlay.style.opacity = 1;
      }
    }
    prevX = e.clientX;
    prevY = e.clientY;
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

  let playButton = document.createElement('img');
  let pauseButton = document.createElement('img');
  playButton.src = 'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/playButtonVideoModule.png';
  pauseButton.src = 'https://nottgy.github.io/einstain/bookmarklets/general_tools/videoModule/pauseButtonVideoModule.png';
  playButton.hidden = true;
  pauseButton.hidden = true;
  wrapper.appendChild(playButton);
  wrapper.appendChild(pauseButton);

  playButton.onload = _=>{
    let element = document.querySelector('#'+PLAY_BUTTON_ID);
    element.height = element.width = 40;
    element.getContext('2d').drawImage(playButton, 0, 0, 40, 40);
  }

  const hookPlayButton = e => {
    let element = document.querySelector('#'+PLAY_BUTTON_ID);
    let isPlaying = (vidElem.currentTime > 0 && !vidElem.paused && !vidElem.ended && vidElem.readyState > 2);
    if (!isPlaying) {
      vidElem.play();
      element.height = element.width = 40;
      element.getContext('2d').drawImage(pauseButton, 0, 0, 40, 40);
    } else {
      vidElem.pause();
      element.height = element.width = 40;
      element.getContext('2d').drawImage(playButton, 0, 0, 40, 40);
    }
  };

  overlayControls[overlayControls.length] = new ControlElement(
    overlayLeft,
    f => {
      let e = document.createElement('canvas');
      e.id = PLAY_BUTTON_ID;
      e.height = e.width = 40;
      e.getContext('2d').drawImage(playButton, 0, 0, 40, 40);
      f.appendChild(e);
      return {elem: e , width: 40};
    },
    e=>{hookPlayButton(e)},
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

  mainIntervalFunction();
})();
