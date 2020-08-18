function Sprite(e){
    this.n=e;
    this.draw=(x,y)=>{
        let m=this.n,i=j=0,s=spriteSize,o;
        while(m>0){
            o=m%3;
            if(o==1)ctx.fillRect(x+s*i,y+s*j,s,s);
            if(o==2){j++;i=-1}
            i++;m=(m-o)/3
        }
    }
};