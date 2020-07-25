function drawLinesNotes(){
    let HEIGHT=bigData.noteHeight;
    let previousY=bigData.drawingOffset.y+bigData.mainCanvas.height/4;

    for(let i=0;i<bigData.music.length;i++){

        drawLineNotes(bigData.music[i],previousY);
        previousY+=HEIGHT;
    }

    if(previousY-HEIGHT<bigData.mainCanvas.height){
        bigData.mainCtx.fillStyle='#FFF';
        bigData.mainCtx.fillRect(0,previousY,bigData.mainCanvas.width,bigData.mainCanvas.height);
    }
}
function drawLineNotes(line,previousY){
    //let previousX=0;
    let previousX=bigData.drawingOffset.x;

    bigData.mainCtx.fillStyle='#FFF';
    bigData.mainCtx.fillRect(0,previousY,bigData.mainCanvas.width,bigData.mainCanvas.height);

    if(previousX>0){
        let x=previousX;
        let y=previousY;
        let h=bigData.noteHeight;

        let w=bigData.mainCanvas.width;

        drawNote({},x,y,w,h,1);
    }
    for(let i=0;i<line.length;i++){
        let x=previousX;
        let y=previousY;
        let h=bigData.noteHeight;

        let w=bigData.secondNoteWidth*line[i].dur;

        drawNote(line[i],x,y,w,h);

        previousX+=w;
    }
    if(previousX<bigData.mainCanvas.width){
        let x=previousX;
        let y=previousY;
        let h=bigData.noteHeight;

        let w=bigData.mainCanvas.width-bigData.drawingOffset.x;

        drawNote({},x,y,w,h,1);
    }
}

function drawNote(note,x0,y0,w0,h0,condition){
    //let x=x0+bigData.drawingOffset.x;
    let x=x0;

    let y=y0;
    let w=w0;
    let h=h0;

    bigData.mainCtx.fillStyle='#CCC';
    if(condition)bigData.mainCtx.fillStyle='#FFF';
    bigData.mainCtx.fillRect(x,y,w,h);

    if(note.vol && note.vol>0 && note.vol<=1){
        bigData.mainCtx.fillStyle='#0458';
        bigData.mainCtx.fillRect(x+2,(y+h-2)-(h-4)*note.vol,w-4,(h-4)*note.vol);

        if(note.type){
            bigData.mainCtx.fillStyle='#F008';
            if(note.type=='square'){
                bigData.mainCtx.fillRect(x+w/2-h/8,y+h/2-h/8,h/4,h/4);
            }
            if(note.type=='sine'){
                drawCircle(x+1+w/2,y+1+h/2,h/8);
            }
        }

        if(note.f){
            let s=(note.f-note.f%10)+' Hz';

            bigData.mainCtx.fillStyle='#7308';
            bigData.mainCtx.font=Math.ceil(bigData.fontSize)+'px Impact, Charcoal, sans-serif';
            bigData.mainCtx.fillText(s,x+4,y+4+bigData.fontSize);
        }
    }
}