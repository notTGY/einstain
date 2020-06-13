let canvas,ctx;

let dx=0,dy=0;

let field=[];
let previousField=[];

let cell_size=30;

let field_size=100;

let mainInterval;
let FPS=3;

let paused=true;

function start(){
    canvas=document.querySelector('#c');
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    ctx=canvas.getContext`2d`;

    addEventListener('onresize',()=>{
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
        ctx=canvas.getContext`2d`;
    });

    oncontextmenu=()=>{return false};

    field=[field_size*field_size];
    for(let i=0;i<field_size;i++){
        for(let j=0;j<field_size;j++){
            field[i*field_size+j]=false;
            if(Math.random()>=0.8){
                field[i*field_size+j]=true;
            }
        }
    }

    displayField(field,dx,dy);


    addEventListener('keydown',(evt)=>{
        processKeyDown(evt);
    });

    addEventListener('mousedown',(evt)=>{
        if(evt.which ==3){
            evt.stopPropagation();
            processRightClick(evt);
        }else if(evt.which ==1){
            processLeftClick(evt);
        }
        evt.preventDefault();
    });
}

function processKeyDown(evt){

    if( (evt.key=='s' || evt.key=='ArrowDown') && (dy<field_size*cell_size-canvas.height) ){
        dy+=cell_size;
        displayField(field,dx,dy);
    }
    if( (evt.key=='d' || evt.key=='ArrowRight') && (dx<field_size*cell_size-canvas.width) ){
        dx+=cell_size;
        displayField(field,dx,dy);
    }
    if( (evt.key=='a' || evt.key=='ArrowLeft') && (dx>cell_size) ){
        dx-=cell_size;
        displayField(field,dx,dy);
    }
    if( (evt.key=='w' || evt.key=='ArrowUp') && (dy>cell_size) ){
        dy-=cell_size;
        displayField(field,dx,dy);
    }
    if((evt.key=='+') && cell_size<30){
        cell_size+=1;
        displayField(field,dx,dy);
    }
    if((evt.key=='-') && cell_size>5){
        cell_size-=1;
        displayField(field,dx,dy);
    }
    if((evt.key=='.') && FPS<30){
        FPS+=1;
        if(!paused){
            clearInterval(mainInterval);
            mainInterval=setInterval(()=>{playGame()},1000/FPS);
        }
    }
    if((evt.key==',') && FPS>4){
        FPS-=1;
        if(!paused){
            clearInterval(mainInterval);
            mainInterval=setInterval(()=>{playGame()},1000/FPS);
        }
    }
}




function swap(f,j,i){
    if( f[i*(field_size)+j] == true){
        f[i*(field_size)+j] = false;
    }else{
        f[i*(field_size)+j] = true;
    }
}


function processLeftClick(evt){
    swap(field,Math.floor(evt.clientX/cell_size+dx/cell_size),Math.floor(evt.clientY/cell_size+dy/cell_size));
    displayField(field,dx,dy);
}

function processRightClick(evt){
    if(paused){
        mainInterval=setInterval(()=>{playGame()},1000/FPS);
        paused=false;
    }else{
        clearInterval(mainInterval);
        paused=true;
    }
}

function displayField(f,dx,dy){
    ctx.fillStyle='#000';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    for(let i=0;i<Math.floor(canvas.height/cell_size);i++){
        for(let j=0;j<Math.floor(canvas.width/cell_size);j++){
            if( (i+Math.floor(dy/cell_size)<field_size) && (j+Math.floor(dx/cell_size)<field_size)){
                displayCell(f,j+Math.floor(dx/cell_size),i+Math.floor(dy/cell_size),j*cell_size,i*cell_size);
            }
        }
    }
}

async function displayCell(f,j,i,x,y){
    ctx.fillStyle='#000';
    if( f[i*(field_size)+j] == true){
        ctx.fillStyle='#FFF';
    }
    ctx.fillRect(x,y,cell_size,cell_size);
}

function numberOfAliveNear(p,j,i){
    let counter=0;
    if(j>0){
        if(i>0){//7
            if(p[(i-1)*field_size+j-1]){
                counter++;
            }
        }
        if(p[i*field_size+j-1]){//4
            counter++;
        }
        if(i<field_size-1){//1
            if(p[(i+1)*field_size+j-1]){
                counter++;
            }
        }

    }

    if(j<field_size-1){
        if(i>0){//9
            if(p[(i-1)*field_size+j+1]){
                counter++;
            }
        }
        if(p[i*field_size+j+1]){//6
            counter++;
        }
        if(i<field_size-1){//3
            if(p[(i+1)*field_size+j+1]){
                counter++;
            }
        }

    }


    if(i>0){//8
        if(p[(i-1)*field_size+j]){
            counter++;
        }
    }
    if(i<field_size-1){//2
        if(p[(i+1)*field_size+j]){
            counter++;
        }
    }
    return counter;
}


function playGame(){


    previousField=[...field];

    for(let i=0;i<field_size;i++){
        for(let j=0;j<field_size;j++){
            checkConditions(previousField,j,i,field);
        }
    }

    displayField(field,dx,dy);
}

async function checkConditions(p,j,i,f){
    let near=numberOfAliveNear(p,j,i);

    if(near<2){
        f[i*field_size+j]= false;
    }
    if(near>3){
        f[i*field_size+j]=false;
    }
    if(near==3 && f[i*field_size+j]==false){
        f[i*field_size+j]=true;
    }
}