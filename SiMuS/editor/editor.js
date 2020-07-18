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

    bigData={drawingOffset:{x:0,y:0},mainCanvas:mainCanvas,mainCtx:mainCtx,audioCtx:audioCtx,music:music,secondNoteWidth:100,fontSize:12};

    addEventListener('resize',whenResized);
    addEventListener('click',clicker);
    addEventListener('keydown',keydownHandler);
    whenResized();

    drawEverything();
}


function whenResized(){
    bigData.mainCanvas.width=window.innerWidth;
    bigData.mainCanvas.height=window.innerHeight;

    bigData.secondNoteWidth=200*bigData.mainCanvas.width/640;
    bigData.fontSize=12*bigData.mainCanvas.height/480;

    bigData.mainCtx=bigData.mainCanvas.getContext`2d`;

    drawEverything();
}

function drawEverything(){
    drawLinesNotes();
    drawUpperMenu();
}


function drawLinesNotes(){
    let HEIGHT=bigData.mainCanvas.height/4;
    for(let i=0;i<bigData.music.length;i++){
        let offsetFromTop=i*HEIGHT+HEIGHT;

        drawLineNotes(bigData.music[i],offsetFromTop);
    }
}
function drawLineNotes(line,previousY){
    let previousX=0;
    for(let i=0;i<line.length;i++){
        let x=previousX;
        let y=previousY;
        let h=bigData.mainCanvas.height/4;

        let w=bigData.secondNoteWidth*line[i].dur;

        drawNote(line[i],x,y,w,h);

        previousX+=w;
    }
}

function drawNote(note,x,y,w,h){
    bigData.mainCtx.fillStyle='#CCC';
    bigData.mainCtx.fillRect(x,y,w,h);

    bigData.mainCtx.fillStyle='#0458';
    bigData.mainCtx.fillRect(x+2,(y+h-2)-(h-4)*note.vol,w-4,(h-4)*note.vol);

    bigData.mainCtx.fillStyle='#F008';
    if(note.type=='square'){
        bigData.mainCtx.fillRect(x+w/2-h/8,y+h/2-h/8,h/4,h/4);
    }
    if(note.type=='sine'){
        drawCircle(x+1+w/2,y+1+h/2,h/8);
    }

    let s=(note.f-note.f%10)+' Hz';

    bigData.mainCtx.fillStyle='#7308';
    bigData.mainCtx.font=Math.ceil(bigData.fontSize)+'px Impact, Charcoal, sans-serif';
    bigData.mainCtx.fillText(s,x+4,y+4+bigData.fontSize);
}



