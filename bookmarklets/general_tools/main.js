/* Global variables:

mainCanvas_TGY_JStool_v1 - mainCanvas

*/

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
  if (mainCanvas_TGY_JStool_v1 == undefined) {
    mainCanvas_TGY_JStool_v1 = document.createElement('canvas');
  } else {
    return 1;
  }
  */


  mainCanvas_TGY_JStool_v1 = document.createElement('canvas');//FIXME

  /* Add id to accept stylesheet */
  mainCanvas_TGY_JStool_v1.id = 'mainCanvas_TGY_JStool_v1';

  mainCanvas_TGY_JStool_v1.width = 100;
  mainCanvas_TGY_JStool_v1.height = 100;


  document.body.appendChild(mainCanvas_TGY_JStool_v1);

  let mainCtx = mainCanvas_TGY_JStool_v1.getContext('2d');

  /* Click handler */
  document.addEventListener('click', e=>{
    let mainCtx = mainCanvas_TGY_JStool_v1.getContext('2d');


    if (e.clientX <= mainCanvas_TGY_JStool_v1.width) {
      if (e.clientY <= mainCanvas_TGY_JStool_v1.height) {
        mainCtx.fillStyle = 'tan';
        mainCtx.fillRect(5,5,45,45);
      }
    }
    
  });



    /* keydown handler */
    document.addEventListener('keydown', e=>{


    });

})();
