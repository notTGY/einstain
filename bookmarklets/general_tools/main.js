(function () {

  /*Check if we had already loaded extension*/

  /*
  if (TGY_bookmarklet_JStool_v1 == undefined) {
    TGY_bookmarklet_JStool_v1 = true;
  } else {
    return 1;
  }
  */

  /*Add canvas if we can*/
  /*
  if (mainCanvas_TGY_bookmarklet_JStool_v1 == undefined) {
    mainCanvas_TGY_bookmarklet_JStool_v1 = document.createElement('canvas');
  } else {
    return 1;
  }
  */


  mainCanvas_TGY_bookmarklet_JStool_v1 = document.createElement('canvas');//FIXME

  /* local variable mainCanvas for easier access */
  let mainCanvas = mainCanvas_TGY_bookmarklet_JStool_v1;
  mainCanvas.style.position='fixed';
  mainCanvas.style.top = 0;
  mainCanvas.style.left = 0;
  mainCanvas.width = 100;
  mainCanvas.height = 100;
  load_style_TGY_bookmarklet_JStool_v1();
  document.body.appendChild(mainCanvas);


  /* Click handler */
  document.addEventListener('click', e=>{


  });



    /* keydown handler */
    document.addEventListener('keydown', e=>{


    });

})();
