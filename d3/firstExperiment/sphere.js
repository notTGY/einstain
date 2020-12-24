function Sphere(center, size, facing, roll) {
  this.type = 'sphere';
  this.r0 = (center||new Vec3(1,1,1));
  this.r = (size||1);

  this.color = new Vec3(0,255,255);

  this.checkCollision = e => {
    let delta = e.sub(this.r0);
    if (delta.length() <= this.r){
        return 1;
    } else {
      return 0;
    }
  };
}
