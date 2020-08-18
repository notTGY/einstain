let bigData=[[]],CELL=50,cols,rows;
function start(n,m){
    let canvas=document.querySelector('#c');
    let ctx=canvas.getContext`2d`;
    canvas.onclick=e=>{
        let canvas=document.querySelector('#c');
        let rect = canvas.getBoundingClientRect();
	    let root = document.documentElement;
	    let clickY=e.clientY-rect.top-root.scrollTop;
        let clickX=e.clientX-rect.left-root.scrollLeft;
        let x=Math.floor(clickX/CELL);
        let y=Math.floor(clickY/CELL);
        if(bigData[y][x]){bigData[y][x]=0}else{bigData[y][x]=1}
        if(bigData[y][x]){
            ctx.fillStyle='#FFF';
            ctx.fillRect(CELL*x,CELL*y,CELL,CELL);
        }else {
            ctx.fillStyle='#000';
            ctx.fillRect(CELL*x,CELL*y,CELL,CELL);
        }
    };
    canvas.width=CELL*m;
    canvas.height=CELL*n;
    cols=n+1;
    rows=m;
    for(let i=0;i<n;i++){
        bigData[i]=[];
    }
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function outputData(){
    let result=document.querySelector('#result');
    result.innerHTML='<br>Hex value: 0x'+calcHex(bigData);
}

function calcHex(data){
    let s='',i=0,j=0;
    while(i<rows){
        if(data[i][j]==1){
            s+='1';
            j++;
        }else{
            let cond=1;
            for(let n=j;n<data[i].length;n++){
                if(data[i][n]==1){
                    cond=0;
                }
            }
            if(cond){
                s+='2';
                i++;
                j=0;
            }else{
                s+='0';
                j++;
            }
        }
    }
    s=convertBackThirdToDec(s);
    s=convertDecToHex(s);
    return s;
}
function convertBackThirdToDec(s){
    let num=0;
    for(let i=0;i<s.length;i++){
        let char=s.substring(i,1);
        let sym=0;
        if(char=='1')sym=1;
        if(char=='2')sym=2;
        num+=sym*Math.pow(3,s.length-i-1);
    }
    return num;
}
function convertDecToHex(num){
    let s='';
    while(num>0){
        let sym=num%16;
        let char='0';
        if(sym==1)char='1';
        if(sym==2)char='2';
        if(sym==3)char='3';
        if(sym==4)char='4';
        if(sym==5)char='5';
        if(sym==6)char='6';
        if(sym==7)char='7';
        if(sym==8)char='8';
        if(sym==9)char='9';
        if(sym==10)char='A';
        if(sym==11)char='B';
        if(sym==12)char='C';
        if(sym==13)char='D';
        if(sym==14)char='E';
        if(sym==15)char='F';
        s=char+s;
        num=(num-num%16)/16;
    }
    return s;
}