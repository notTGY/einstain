function keydownHandler(evt){
    //SMSplayNotes(bigData.music,bigData.audioCtx,0);
    if(evt.key=='ArrowLeft'){
        bigData.keyboard.left=1;
    }else if(evt.key=='ArrowRight'){
        bigData.keyboard.right=1;
    }else if(evt.key=='ArrowDown'){
        bigData.keyboard.down=1;
    }else if(evt.key=='ArrowUp'){
        bigData.keyboard.up=1;
    }
}
function keyupHandler(evt){
    if(evt.key=='ArrowLeft'){
        bigData.keyboard.left=0;
    }else if(evt.key=='ArrowRight'){
        bigData.keyboard.right=0;
    }else if(evt.key=='ArrowDown'){
        bigData.keyboard.down=0;
    }else if(evt.key=='ArrowUp'){
        bigData.keyboard.up=0;
    }else if(evt.key=='-'){
        if(bigData.music.length*bigData.noteHeight>(3/4)*bigData.mainCanvas.height){
            bigData.stdNoteHeight-=10;
            bigData.stdNoteWidth-=10;
            bigData.stdFontSize-=1;
            whenResized();
        }
    }else if(evt.key=='='||evt.key=='+'){

            bigData.stdNoteHeight+=10;
            bigData.stdNoteWidth+=10;
            bigData.stdFontSize+=1;
            whenResized();

    }
}

let keyManageInterval;

function keyManager(){
    if(bigData.keyboard.left)bigData.drawingOffset.x+=bigData.mainCanvas.width/100;
    if(bigData.keyboard.right)bigData.drawingOffset.x-=bigData.mainCanvas.width/100;
    if(bigData.drawingOffset.x>50)bigData.drawingOffset.x=50;

    if(bigData.music.length*bigData.noteHeight>(3/4)*bigData.mainCanvas.height){

        if(bigData.keyboard.down)bigData.drawingOffset.y-=bigData.mainCanvas.height/100;
        if(bigData.keyboard.up)bigData.drawingOffset.y+=bigData.mainCanvas.height/100;

        if(bigData.drawingOffset.y>0)bigData.drawingOffset.y=0;

        let tmp=bigData.music.length*bigData.noteHeight-(3/4)*bigData.mainCanvas.height;
        if( bigData.drawingOffset.y<-tmp )bigData.drawingOffset.y=-tmp;
    }
    drawEverything();
}