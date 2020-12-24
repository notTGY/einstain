let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let RESOLUTION = {width: 64, height: 48};

let MAX_RAY_LENGTH = 10;
let STEP = 0.5;

onresize = _ => {
  canvas.width = window.visualViewport.width;
  canvas.height = window.visualViewport.height;
}

onresize();

let scene = [];

scene[0] = new Sphere(new Vec3(0,6,0));

let pos = new Vec3(1,0,0);
let viewRay = (new Vec3(0,5,1)).normalized().mult(Math.sqrt(3) / 2);

let sun = new Vec3(10,5,100);

function renderFrame() {
  raytraceObjects();

  requestAnimationFrame(renderFrame);
}

renderFrame();
