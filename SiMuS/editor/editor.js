let mainCanvas;

function startUp(){
    mainCanvas=document.querySelector('#mainCanvas');
    let mainCtx=mainCanvas.getContext`2d`;

    let audioCtx=new(window.audioContext||window.AudioContext||window.webkitAudioContext);

    let music=[[]];

    note1=new Note(1,200,'sine',.5);
    note2=new Note(.3,400,'sine',.5);

    music[0]=[note1,note2];

    window.onclick=SMSplayNotes(music,audioCtx,0);

    let bigData={mainCanvas:mainCanvas,mainCtx:mainCtx,music:music};
    drawEverything(bigData);
    addEventListener('resize',whenResized);
    whenResized();
}

function whenResized(){
    mainCanvas.width=window.innerWidth;
    mainCanvas.height=window.innerHeight;
}

function drawEverything(data){
    drawUpperMenu(data);
    drawLinesNotes(data);
}



function drawLinesNotes(data){
    let mainCtx=data.mainCtx;
    let mainCanvas=data.mainCanvas;
}