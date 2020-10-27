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

    let x = mainCanvas_TGY_JStool_v1.offsetLeft - document.body.offsetLeft;
    let y = mainCanvas_TGY_JStool_v1.offsetTop - document.body.offsetTop;
    let w = mainCanvas_TGY_JStool_v1.width;
    let h = mainCanvas_TGY_JStool_v1.height;
    let id = mainCanvas_TGY_JStool_v1.id;
    let X = e.clientX;
    let Y = e.clientY;

    if (id == 'mainCanvas_TGY_JStool_v1') {

      /* check if we need to move this thing down */
      if (X <= x+w && Y <= y+h) {
        if (X > x+w/2 && Y > y+h/2) {
          mainCanvas_TGY_JStool_v1.id = 'mainCanvas_TGY_JStool_v1_down';
        }
      }



    } else if (id == 'mainCanvas_TGY_JStool_v1_down'){

      /* check if we need to move this thing up */
      if (X <= x+w && Y <= y+h/2) {
        if (X > x+w/2 && Y > y) {
          mainCanvas_TGY_JStool_v1.id = 'mainCanvas_TGY_JStool_v1';
          drawTriangleDown(mainCtx,x+w/2,y+h/2,Math.min(w/2,h/2));
        }
      }



    }


  });



    /* keydown handler */
    document.addEventListener('keydown', e=>{


    });

    /* draws light-gray triangle on the given ctx, at given coords, s is size of each side */
    function drawTriangleDown(ctx,x,y,s) {
      ;
    }
})();
