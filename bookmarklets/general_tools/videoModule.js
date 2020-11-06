(function(){
  /* Magic numbers */
  const OVERLAY_ID = 'overlay_video_module';
  const OVERLAY_HEIGHT = 200;


  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
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

  insertAfter(vidElem, overlay);

  /* closing stuff and fullscreen enter point */
  vidElem.requestFullscreen();
  let handler = e => {
    if (e.key == 'Escape') {
      document.exitFullscreen();
      let mainCanvas = document.querySelector('#mainCanvas');
      mainCanvas.hidden = false;
      killThisScript();
      document.body.removeEventListener('keydown', handler);
    }
  };
  document.body.addEventListener('keydown', handler);
})();
