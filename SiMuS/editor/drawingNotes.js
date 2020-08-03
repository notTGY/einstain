function drawLinesNotes(){
    let HEIGHT=bigData.noteHeight;
    let previousY=bigData.drawingOffset.y+bigData.mainCanvas.height/4;

    for(let i=0;i<bigData.music.length;i++){

        drawLineNotes(bigData.music[i],previousY,i);
        previousY+=HEIGHT;
    }

    if(previousY-HEIGHT<bigData.mainCanvas.height){
        bigData.mainCtx.fillStyle='#FFF';
        bigData.mainCtx.fillRect(0,previousY,bigData.mainCanvas.width,bigData.mainCanvas.height);
    }

}
function drawLineNotes(line,previousY,index){
    //let previousX=0;
    let previousX=bigData.drawingOffset.x;

    bigData.mainCtx.fillStyle='#FFF';
    bigData.mainCtx.fillRect(0,previousY,bigData.mainCanvas.width,bigData.mainCanvas.height);

    if(previousX>0){
        let qualifier=bigData.mainCanvas.width/640;
        let y=previousY;
        let h=bigData.noteHeight;
        let w=50*qualifier;
        let x=bigData.drawingOffset.x-w;

        drawNote({},x,y,w,h,1);
        let width=myMin(w/2,bigData.noteHeight/2);
        bigData.mainCtx.fillStyle='#090';
        drawCross(x+width,y+bigData.noteHeight/2,width-2*qualifier);
    }
    for(let i=0;i<line.length;i++){
        let x=previousX;
        let y=previousY;
        let h=bigData.noteHeight;

        let w=bigData.secondNoteWidth*line[i].dur;

        let highlighted=0;

        if(bigData.selected!=undefined && bigData.selected.row!=undefined && bigData.selected.num!=undefined){
            if(bigData.selected.row==index){
                if(bigData.selected.num==i){
                    highlighted=1;
                }
            }
        }

        drawNote(line[i],x,y,w,h,0,highlighted);

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

function drawNote(note,x0,y0,w0,h0,condition,highlight){
    let oQ=2*bigData.mainCanvas.width/640;
    let x=x0;
    let y=y0;
    let w=w0;
    let h=h0;

    bigData.mainCtx.fillStyle='#CCC';
    if(condition)bigData.mainCtx.fillStyle='#FFF';
    bigData.mainCtx.fillRect(x,y,w,h);
    if(highlight){
        bigData.mainCtx.strokeStyle='#880';
        bigData.mainCtx.lineWidth=oQ;
        bigData.mainCtx.strokeRect(x+oQ,y+oQ,w-oQ*2,h-oQ*2);
    }

    if(note.vol && note.vol>0 && note.vol<=1){
        bigData.mainCtx.fillStyle='#0458';
        bigData.mainCtx.fillRect(x+oQ,(y+h-oQ)-(h-2*oQ)*note.vol,w-2*oQ,(h-2*oQ)*note.vol);

        if(note.type && w>=oQ){
            bigData.mainCtx.fillStyle='#F008';
            bigData.mainCtx.strokeStyle='#F008';
            if(note.type=='square'){
                let side=myMin(h/4,(w-oQ)/2);
                bigData.mainCtx.fillRect(x+w/2-side/2,y+h/2-side/2,side,side);
            }
            if(note.type=='sine'){
                let radius=myMin(h/8,(w-oQ)/2);
                drawCircle(x+w/2,y+h/2,radius);
            }
            if(note.type=='triangle'){
                let radius=myMin(h/8,(w-oQ)/2);
                drawRightTriangle(x+w/2,y+h/2,radius);
            }
            if(note.type=='sawtooth'){
                let radius=myMin(h/8,(w-oQ)/2);
                drawSawTooth(x+w/2,y+h/2,radius);
            }
        }

        if(note.f){
            let s=(note.f-note.f%10)+' Hz';

            bigData.mainCtx.fillStyle='#7308';
            let fontSize=Math.ceil(bigData.fontSize);
            bigData.mainCtx.font=fontSize+'px Impact, Charcoal, sans-serif';
            bigData.mainCtx.fillText(s,x+2*oQ,y+2*oQ+bigData.fontSize);
        }
    }
}