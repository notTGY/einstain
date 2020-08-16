let strings=[];
let ROWS=40;
let RANDOMIZER=0.07;
let MAXLENGTH=10;
let SPEED=7;


function StringWorm(row,charSize,lengthSize,arr){
    this.x=row*charSize;
    this.charSize=charSize;
    this.y= -charSize*lengthSize;
    this.length=lengthSize;
    this.chars=[...arr];
}


function start(){
    onresize=_=>{
            let canvas=document.querySelector("#c");
            canvas.width=window.innerWidth;
            canvas.height=window.innerHeight;
    };
    onresize();
    let canvas=document.querySelector("#c");
    let ctx=canvas.getContext`2d`;
    setInterval(mainLoop,17);
    setInterval(spawningLoop,1000);
}


function calcSize(){
    let canvas=document.querySelector("#c");
    return Math.floor(canvas.width/ROWS);
}


function getRandomSeq(length){
    let seq=[];
    for(let i=0;i<length;i++){
        seq[i]=randomChar();
    }
    return seq;
}


function spawningLoop(){
    for(let i=0;i<ROWS;i++){
        if(Math.random()<=RANDOMIZER){
            let row=i;
            let length=Math.ceil(Math.random()*MAXLENGTH);
            let charSize=calcSize();
            let chars=getRandomSeq(length);
            strings[strings.length]=new StringWorm(row,charSize,length,chars);
        }
    }
}


function recalcSize(){
    for(let i=0;i<strings.length;i++){
        strings[i].charSize=calcSize();
    }
}


function mainLoop(){
    recalcSize();
    drawStrings();
    moveStrings();
}


function moveStrings(){
    let canvas=document.querySelector('#c');
    for(let i=0;i<strings.length;i++){
        strings[i].y+=SPEED*480/canvas.height;
        if(strings[i].y>canvas.height){
            strings.splice(i,1);
            i--;
        }
    }
}

function drawStrings(){
    let canvas=document.querySelector('#c');
    let ctx=canvas.getContext`2d`;
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<strings.length;i++){
        drawString(strings[i]);
    }
}


function drawString(str){
    let canvas=document.querySelector('#c');
    let ctx=canvas.getContext`2d`;
    for(let i=0;i<str.length;i++){
        ctx.fillStyle='#0F0';
        ctx.font=str.charSize+'px impact';
        ctx.fillText(str.chars[i],str.x,str.y+str.charSize*i,str.charSize,str.charSize);
    }
}


function randomChar(){//FIX ME
    let possibleChars=[];
    possibleChars=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
    ' ','!','.',',','\'','\"','<','>','[','{',']','}','(',')','@','#','$','%','^','&','*',':',';','`','~','-','_','=','+'];


    let char=possibleChars[Math.floor(Math.random()*possibleChars.length)];
    return char||'|';
}
