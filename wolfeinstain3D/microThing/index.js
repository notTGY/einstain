map="_.......________________________________________________________";
//any char value below . is space, any value >= . is a wall


s=4*50;
//size of the screen


h=s/4;
//height and width of the raycasting


v2=function(x,y){this.x=x;this.y=y;this.a=e=>{this.x+=e.x;this.y+=e.y;return this};this.m=e=>{this.x*=e;this.y*=e;return this}};
//vector 2d. Basic operations like add another vector or multiply by a constant

c=new v2(0,3.5);
//coordinates of the player


v=new v2(1,0);
//vector of the fov/velocity


mv=0;
//value of speed , can be negative


a=0;
//angle between Ox and velocity vector


aV=0;
//angular velocity

dt=.04;
//time it takes each iteration

F=_=>{
  C.height=s;
  C.width=s;
  Q=Math.cos;

  c.a(v.m(dt*mv));
  a+=dt*aV;
  v.x=Q(a);
  v.y=Q(1.57-a);



  for(x=h;x--;)
    for(y=h;y--;X.fillRect(x*4,y*4,b-d?4:D/2,D/2))
      for(D=0;'.'<map[
        D*y/h-D/2|0?
        0
        :(d=c.x+D*Q(R=x/h-.5+1/8+a)&7)|(c.y+D*Q(1.57-R))<<3
      ]&&D<8;b=d)D+=.2
};
onload=X=C.getContext`2d`,setInterval(F,dt*1e3);





onkeydown=e=>{
  switch(e.keyCode) {
    case 38:
      mv=1.5;
    break;
    case 40:
      mv=-1.5;
    break;
    case 39:
      aV=1.2;
    break;
    case 37:
      aV=-1.2;
    break;
  }
}

onkeyup=e=>{
  switch(e.keyCode) {
    case 38:
      mv=0;
    break;
    case 40:
      mv=0;
    break;
    case 39:
      aV=0;
    break;
    case 37:
      aV=0;
    break;
  }
}
