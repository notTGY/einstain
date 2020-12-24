function Vec3(x,y,z) {
  const toHex = e => {
    let one =  Math.floor(e % 16);
    let two =  Math.floor(e / 16) % 16;
    if (one > 9) {
      switch(one) {
        case 10:
          one = 'a';
          break;
        case 11:
          one = 'b';
          break;
        case 12:
          one = 'c';
          break;
        case 13:
          one = 'd';
          break;
        case 14:
          one = 'e';
          break;
        case 15:
          one = 'f';
          break;
        default:
          one = '0';
          break;
      }
    }
    if (two > 9) {
      switch(two) {
        case 10:
          two = 'a';
          break;
        case 11:
          two = 'b';
          break;
        case 12:
          two = 'c';
          break;
        case 13:
          two = 'd';
          break;
        case 14:
          two = 'e';
          break;
        case 15:
          two = 'f';
          break;
        default:
          two = '0';
          break;
      }
    }
    return '' + two + one;
  };

  if (x == undefined) {
    x = 0;
  }
  if (y == undefined) {
    y = 0;
  }
  if (z == undefined) {
    z = 0;
  }
  this.x = x;
  this.y = y;
  this.z = z;

  this.mult = e => new Vec3(this.x*e, this.y*e, this.z*e);

  this.scalMult = (x,y,z) => {
    if (typeof(x) == 'object') {
      return this.x*(x.x||0) + this.y*(x.y||0) + this.z*(x.z||0);
    }
    return this.x*(x||0) + this.y*(y||0) + this.z*(z||0);
  };

  this.vecMult = (x,y,z) => {
      if (typeof(x) == 'object') {
        if (x.x == undefined) {
          x.x = 0;
        }
        if (x.y == undefined) {
          x.y = 0;
        }
        if (x.z == undefined) {
          x.z = 0;
        }
        return new Vec3(
            this.y*x.z - x.y*this.z,
            -(this.x*x.z - x.x*this.z),
            this.x*x.y - x.x*this.y
        );
      }
      if (x == undefined) {
        x = 0;
      }
      if (y == undefined) {
        y = 0;
      }
      if (z == undefined) {
        z = 0;
      }
      return new Vec3(
          this.y*z - y*this.z,
          -(this.x*z - x*this.z),
          this.x*y - x*this.y
      );
  };

  this.add = (x,y,z) => {
    if (typeof(x) == 'object') {
      return new Vec3(
          this.x + (x.x||0),
          this.y + (x.y||0),
          this.z + (x.z||0)
      );
    }
    return new Vec3(
        this.x + (x||0),
        this.y + (y||0),
        this.z + (z||0)
    );
  };

  this.sub = (x,y,z) => {
    if (typeof(x) == 'object') {
      return new Vec3(
          this.x - (x.x||0),
          this.y - (x.y||0),
          this.z - (x.z||0)
      );
    }
    return new Vec3(
        this.x - (x||0),
        this.y - (y||0),
        this.z - (z||0)
    );
  };

  this.toRGB = _ => `#${toHex(this.x)}${toHex(this.y)}${toHex(this.z)}`;

  this.length = _ => Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
  this.normalized = _ => {
    return this.mult(1 / this.length());
  };


  this.id = e => {
    return new Vec3(this.x, this.y, this.z);
  };
}
