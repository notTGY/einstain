function raytraceObjects() {
  let dx = canvas.width / RESOLUTION.width;
  let dy = canvas.height / RESOLUTION.height;
  let offX = RESOLUTION.width / 2;
  let offY = RESOLUTION.height / 2;
  let horizontalRay = new Vec3(1,0,0);
  let verticalRay = new Vec3(0,0,1);
  for (let i = 0; i < RESOLUTION.width; i++) {
    for (let j = 0; j < RESOLUTION.height; j++) {
      let offsetHor = (i - offX + 1/2) / RESOLUTION.width;
      let offsetVer = (j - offY + 1/2) / RESOLUTION.height;
      let ray = pos.add(
        viewRay.add(horizontalRay.mult(offsetHor))
        .add(verticalRay.mult(offsetVer))
      );
      let cl = calculateColor(ray);
      ctx.fillStyle = cl.toRGB();
      ctx.fillRect(i*dx, j*dy, dx, dy);
    }
  }
}

function calculateColor(ray) {
  let increment = STEP;
  let dr = ray.sub(pos).normalized().mult(increment);
  let curRay = ray.id();
  for (let dist = 0; dist < MAX_RAY_LENGTH; dist += increment) {
    for (let i = 0; i < scene.length; i++) {
      let obj = scene[i];
      if (obj.checkCollision(curRay)) {
        return shade(curRay, obj.color.mult(1 - dist / MAX_RAY_LENGTH));
      }
    }

    curRay = curRay.add(dr);
  }
  return new Vec3(0,0,0);
}

function shade(ray, color) {
  let sunDist = sun.sub(ray).length();
  let x = 1 - .5*sunDist/1000;
  let newCl = color.mult(x);
  if (newCl.x > 255) {
    newCl = newCl.mult(255/newCl.x);
  }
  if (newCl.y > 255) {
    newCl = newCl.mult(255/newCl.y);
  }
  if (newCl.z > 255) {
    newCl = newCl.mult(255/newCl.z);
  }
  return newCl;
}
