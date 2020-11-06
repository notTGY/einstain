(function(){
  let vidElem = document.querySelectorAll('video')[0];
  if (vidElem == undefined || vidElem == NaN || vidElem == false) {
    mainCanvas.hidden = false;
  }
  vidElem.requestFullscreen();
  vidElem.addEventListener('keydown', e => {
    if (e.key == 'Escape') {
      vidElem.exitFullscreen();
      mainCanvas.hidden = false;
    }
  });
})();
