let bigData;


function drawCircle(x,y,r){
    bigData.mainCtx.beginPath();
    bigData.mainCtx.arc(x,y,r,0,2*Math.PI,1);
    bigData.mainCtx.fill();
}

function drawRightTriangle(x,y,widthDiv2){

    let sqrt3=Math.sqrt(3);
    let heightDiv2=widthDiv2*sqrt3/2;

    let p1={x:x-widthDiv2,y:y+heightDiv2};
    let p2={x:x,y:y-heightDiv2};
    let p3={x:x+widthDiv2,y:y+heightDiv2};

    bigData.mainCtx.beginPath();
    bigData.mainCtx.moveTo(p1.x,p1.y);
    bigData.mainCtx.lineTo(p2.x,p2.y);
    bigData.mainCtx.lineTo(p3.x,p3.y);
    bigData.mainCtx.closePath();
    bigData.mainCtx.fill();
}

function drawSawTooth(x,y,widthDiv2){
    let outlineQualifier=2*bigData.mainCanvas.width/640;

    let heightDiv2=widthDiv2*5/8;

    let p1={x:x-widthDiv2,y:y};
    let p2={x:x,y:y-heightDiv2};
    let p3={x:x,y:y+heightDiv2};
    let p4={x:x+widthDiv2,y:y};

    bigData.mainCtx.beginPath();
    bigData.mainCtx.moveTo(p1.x,p1.y);
    bigData.mainCtx.lineTo(p2.x,p2.y);
    bigData.mainCtx.lineTo(p3.x,p3.y);
    bigData.mainCtx.lineTo(p4.x,p4.y);
    bigData.mainCtx.lineWidth=outlineQualifier;
    bigData.mainCtx.stroke();
}

function drawCross(x,y,widthDiv2){
    bigData.mainCtx.fillRect(x-widthDiv2,y-widthDiv2/3,2*widthDiv2,widthDiv2*2/3);
    bigData.mainCtx.fillRect(x-widthDiv2/3,y-widthDiv2,widthDiv2*2/3,2*widthDiv2);
}

function drawPlayTriangle(x,y,widthDiv2){

    let sqrt3=Math.sqrt(3);
    let heightDiv2=widthDiv2*2/sqrt3;

    let p1={x:x-widthDiv2,y:y-heightDiv2};
    let p2={x:x-widthDiv2,y:y+heightDiv2};
    let p3={x:x+widthDiv2,y:y};

    bigData.mainCtx.beginPath();
    bigData.mainCtx.moveTo(p1.x,p1.y);
    bigData.mainCtx.lineTo(p2.x,p2.y);
    bigData.mainCtx.lineTo(p3.x,p3.y);
    bigData.mainCtx.closePath();
    bigData.mainCtx.fill();
}

function drawPause(x,y,widthDiv2){
    bigData.mainCtx.fillRect(x-widthDiv2,y-widthDiv2,widthDiv2*2,widthDiv2*2);
}


function myMin(a,b){
    if(a>b)return b;
    return a;
}

function copy(input){
    return JSON.parse(JSON.stringify(input));
}

function startUp(){
    mainCanvas=document.querySelector('#mainCanvas');
    let mainCtx=mainCanvas.getContext`2d`;

    let audioCtx=new(window.audioContext||window.AudioContext||window.webkitAudioContext);

    let music=[[]];

    note1=new Note(1,200,'sine',.5);
    blankNote=new Note(0,0,'sine',.5);
    note2=new Note(.3,400,'sine',.5);
    note3=new Note(.2,500,'square',1);
    note4=new Note(.2,500,'triangle',.5);
    note5=new Note(.2,500,'sawtooth',.7);

    music[0]=[note1.c(),blankNote.c(),note4.c(),blankNote.c(),note2.c()];
    music[1]=[blankNote.c(),note3.c(),blankNote.c(),note5.c()];


    bigData={
        drawingOffset:{x:100,y:0},
        mainCanvas:mainCanvas,
        mainCtx:mainCtx,audioCtx:audioCtx,
        music:music,secondNoteWidth:100,
        fontSize:12,noteHeight:100,
        stdNoteHeight:120,stdNoteWidth:200,
        stdFontSize:12
    };

    bigData.interact={right:0,left:0,up:0,down:0};

    bigData.mouseInteract={right:0,left:0,up:0,down:0};

    bigData.keyboard={right:0,left:0,up:0,down:0,shift:0};

    bigData.attached={row:undefined,num:undefined};

    bigData.selected={row:0,num:0};

    bigData.leftMousePressed=0;

    bigData.playing=0;

    bigData.registeringEvents=1;

    bigData.switchedToSecondaryWindow=0;

    bigData.stage='';

    bigData.secondaryWindow=document.querySelector("#secondaryWindow");

    initButtons();

    keyManageInterval=setInterval(keyManager,17);

    addEventListener('resize',whenResized);
    addEventListener('mousedown',clicker);
    addEventListener('mouseup',unclicker);
    oncontextmenu=()=>{return false};
    addEventListener('mousemove',mouseMover);
    addEventListener('keydown',keydownHandler);
    addEventListener('keyup',keyupHandler);
    whenResized();

    drawEverything();
}


function whenResized(){
    bigData.mainCanvas.width=window.innerWidth;
    bigData.mainCanvas.height=window.innerHeight;

    bigData.noteHeight=bigData.stdNoteHeight*mainCanvas.height/480;
    bigData.secondNoteWidth=bigData.stdNoteWidth*bigData.mainCanvas.width/640;
    bigData.fontSize=bigData.stdFontSize*bigData.mainCanvas.height/480;

    resizeButtons(bigData.mainCanvas.width,bigData.mainCanvas.height);

    onWindowResize(bigData.mainCanvas.width,bigData.mainCanvas.height);

    bigData.mainCtx=bigData.mainCanvas.getContext`2d`;

    drawEverything();
}

function drawEverything(){
    drawLinesNotes();
    drawUpperMenu();
}
