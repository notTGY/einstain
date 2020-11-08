(function(){
  /* Magic numbers */
  const OVERLAY_ID = 'overlay_video_module';
  const OVERLAY_HEIGHT = 50;
  const WRAPPER_ID = 'wrapper_video_module';


  function ControlElement (fatherElement, imagePath, callback, style) {
    let elem = document.createElement('img');
    elem.src  = imagePath;
    fatherElement.appendChild(elem);

    if (style) {
      Object.keys(style).forEach(e => {
        elem.style[e] = style[e];
      });
    }

    elem.addEventListener('click', callback);

    this.element = elem;
    this.callback = callback;
    this.remove = _ => {
      this.element.removeEventListener('click', this.callback);
      this.element.remove();
    };
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
  overlay.style.width = Math.floor(window.visualViewport.width) + 'px';
  overlay.width = Math.floor(window.visualViewport.width);
  overlay.height = OVERLAY_HEIGHT;
  overlay.style.height = OVERLAY_HEIGHT + 'px';
  overlay.style.visibility = 'visible';
  overlay.style.Zindex = '2147483647';
  /* creating wrap-around div */
  let wrapper = wrap(vidElem);
  wrapper.id = WRAPPER_ID;

  wrapper.style.position = 'relative';

  insertAfter(vidElem, overlay);

  /* configuring video element */
  vidElem.style.zIndex = '1';

  /* creating widgets itself */

  let overlayControls = [];


  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/playButtonVideoModule.png',
    e => {vidElem.play()},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/pauseButtonVideoModule.png',
    e => {vidElem.pause()},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/volumeDownButtonVideoModule.png',
    e => {vidElem.volume -= .1},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/volumeUpButtonVideoModule.png',
    e => {vidElem.volume += .1},
    {margin: '5px', width: '40px', height:'40px'}
  );


  /* closing stuff and fullscreen enter point */
  wrapper.requestFullscreen();
  vidElem.style.width = '100%';
  vidElem.style.height = '100%';
  vidElem.controls = false;

  let handler = e => {
    if (e.key == 'Escape') {
      document.exitFullscreen();
      let mainCanvas = document.querySelector('#mainCanvas');
      mainCanvas.hidden = false;
      vidElem.controls = true;
      vidElem.style.width = '';
      vidElem.style.height = '';
      killOverlay();
      killThisScript();
      document.body.removeEventListener('keydown', handler);
    }
  };
  document.body.addEventListener('keydown', handler);

  /* continuing widgets */

  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/escapeButtonVideoModule.png',
    handler,
    {margin: '5px', width: '40px', height:'40px', right: '5px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/jumpBackwardButtonVideoModule.png',
    e => {vidElem.currentTime -= 5},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/jumpForwardButtonVideoModule.png',
    e => {vidElem.currentTime += 5},
    {margin: '5px', width: '40px', height:'40px'}
  );

  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/speedDownButtonVideoModule.png',
    e => {vidElem.playbackRate -= .1},
    {margin: '5px', width: '40px', height:'40px'}
  );


  overlayControls[overlayControls.length] = new ControlElement(
    overlay,
    'https://nottgy.github.io/einstain/bookmarklets/general_tools/speedUpButtonVideoModule.png',
    e => {vidElem.playbackRate += .1},
    {margin: '5px', width: '40px', height:'40px'}
  );

})();
