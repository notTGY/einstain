const c = document.getElementById('canvas');
const ctx = c.getContext('2d');
let radius = 0;

onresize = ()=> {
  c.width = window.visualViewport.width;
  c.height = window.visualViewport.height;
  radius = Math.min(c.width, c.height) * 3 / 8;
}

onresize();

function render() {
  const mult = radius / 180;

  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = '#000';


  ctx.lineWidth = 5 * mult;
  ctx.strokeStyle = '#ccc';

  ctx.beginPath();
  ctx.arc(Math.floor(c.width) / 2, Math.floor(c.height) / 2, radius, 0, 2 * Math.PI, false);
  ctx.stroke();


  const curDate = new Date();
  const bigAngle = Math.PI * 2 * (curDate.getHours() % 12) / 12;
  const smallAngle = Math.PI * 2 * (curDate.getMinutes() % 60) / 60;
  const smallestAngle = Math.PI * 2 * (curDate.getSeconds() % 60) / 60;

  console.log(bigAngle, smallAngle);


  ctx.lineWidth = 4 * mult;
  ctx.strokeStyle = '#000';

  ctx.translate(c.width/2, c.height/2);
  ctx.rotate(bigAngle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius / 2);
  ctx.stroke();
  ctx.rotate(-bigAngle);

  ctx.lineWidth = 2 * mult;
  ctx.rotate(smallAngle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 3 / 4);
  ctx.stroke();
  ctx.rotate(-smallAngle);

  ctx.lineWidth = mult;
  ctx.strokeStyle = '#f00';
  ctx.rotate(smallestAngle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -radius * 7 / 8);
  ctx.stroke();
  ctx.rotate(-smallestAngle);
  ctx.translate(-c.width/2, -c.height/2);


  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.arc(Math.floor(c.width) / 2, Math.floor(c.height) / 2, mult * 4, 0, 2 * Math.PI, false);
  ctx.fill();

  requestAnimationFrame(render);
}

render();
