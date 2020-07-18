let bigData;


function drawCircle(x,y,r){
    bigData.mainCtx.beginPath();
    bigData.mainCtx.arc(x,y,r,0,2*Math.PI,1);
    bigData.mainCtx.fill();
}


function startUp(){
    mainCanvas=document.querySelector('#mainCanvas');
    let mainCtx=mainCanvas.getContext`2d`;

    let audioCtx=new(window.audioContext||window.AudioContext||window.webkitAudioContext);

    let music=[[]];

    note1=new Note(1,200,'sine',.5);
    note2=new Note(.3,400,'sine',.5);
    note3=new Note(.8,500,'square',1.5);

    music[0]=[note1,note1,note1,note1,note2];
    music[1]=[note1,note3,note1,note2];
    music[2]=[note1,note1,note1,note1,note2];
    music[3]=[note1,note1,note1,note1,note2];

    /*
    onclick=function(audioCtx){
        let music=[[]];
        note1=new Note(1,200,'sine',.5);
        note2=new Note(.3,400,'sine',.5);

        music[0]=[note1,note2];

        SMSplayNotes(music,audioCtx,0);

        //music=convertNotes(music);
        //SMSplay(music,audioCtx,0);
    };*/

    bigData={
        drawingOffset:{x:100,y:0},
        mainCanvas:mainCanvas,
        mainCtx:mainCtx,audioCtx:audioCtx,
        music:music,secondNoteWidth:100,
        fontSize:12,noteHeight:100,
        stdNoteHeight:120,stdNoteWidth:200,
        stdFontSize:12
    };

    bigData.keyboard={right:0,left:0,up:0,down:0};

    keyManageInterval=setInterval(keyManager,17);

    addEventListener('resize',whenResized);
    addEventListener('click',clicker);
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

    bigData.mainCtx=bigData.mainCanvas.getContext`2d`;

    drawEverything();
}

function drawEverything(){
    drawLinesNotes();
    drawUpperMenu();
}
