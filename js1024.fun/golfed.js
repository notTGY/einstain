h=a.height;b=[w=a.width];
c.font='5cm Chalkduster, fantasy';
R=Math.random;
I=Math.sin;
T=Date.now;
F=e=>c.fillStyle=e;
B=_=>{F`#557094`;c.fillRect(0,0,w,h)};
S=i=>b[i]=[R()*w,-(r=50+99*R()),r];
U=(e,x,y)=>{F`#ccc`;c[z='fillText'](e,x+7,y+7);F`#fff`;c[z](e,x,y)};
A=(...e)=>{c.beginPath();c.fill(c.arc(...e,0,7))};
P=([x,y,r])=>{for(j=8;j--;A(x,y,r-j))F`#32478410`;F`#8297f420`;for(j=3;j--;A(x-X,y-Y,d))[X,Y,d]=[[r/4,r/5,r/8],[r/3,-r/6,r/9],[-r/3,r/6,r/9]][j]};
for(i=v=N=15;i--;b[i]=[R()*w,R()*h,50+99*R()])L=0;
onmousedown=ontouchstart=e=>{for(i=N;i--;){[X,Y,d]=b[i];if(Math.hypot(X-e.x,Y-e.y)<d){S(i);v+=2;break}}};
s=T();
setInterval(_=>{
  B(t=(T()-s)/1e3);
  t<2&&U(L+1,w/2,h/2-t*h);
  for(i=N;t>2&&i--;P(b[i])){[x,y,r]=b[i];if(y<-r)v--,e=h+r;else e=y-(4+L)*r/500;b[i]=[Math.min(w-r,Math.max(r,x+r*I(9*t+i/9)/40)),e,Math.max(48, r + I(t)/9)]}
  if(t>2&&t<17)U(v,30,200),c.fillRect(0,h-9,w*(t-2)/15,9);
  if(t>17){if(v<0)U(`passed level`,N=0,h/3),U(L,w/2,h*0.7+9*Math.sin(9*t));else L++,S(N++),v++,s=T()}
},8)

