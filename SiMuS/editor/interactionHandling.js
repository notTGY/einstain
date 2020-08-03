function keydownHandler(evt){

    if(bigData.registeringEvents){

        if(evt.key=='ArrowLeft'){
            bigData.keyboard.left=1;
        }else if(evt.key=='ArrowRight'){
            bigData.keyboard.right=1;
        }else if(evt.key=='ArrowDown'){
            bigData.keyboard.down=1;
        }else if(evt.key=='ArrowUp'){
            bigData.keyboard.up=1;
        }else if(evt.key=='Shift'){
            bigData.keyboard.shift=1;
        }

    }
}
function keyupHandler(evt){

    if(bigData.registeringEvents){

        if(evt.key=='p'){
            if(bigData.playing==0){
                bigData.playing=1;
                SMSplayNotes(bigData.music,bigData.audioCtx,0);
            }else{
                bigData.playing=0;
            }
        }


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
        }else if( (evt.key=='='||evt.key=='+') && (bigData.keyboard.shift==0) ){

                bigData.stdNoteHeight+=10;
                bigData.stdNoteWidth+=10;
                bigData.stdFontSize+=1;
                whenResized();

            }else if(evt.key=='0'){

                bigData.stdNoteHeight=120;
                bigData.stdNoteWidth=200;
                bigData.stdFontSize=12;
                whenResized();

            }else if(evt.key=='Delete' || evt.key=='Backspace'){
                if(bigData.selected!=undefined && bigData.selected.row!=undefined && bigData.selected.num!=undefined){
                    bigData.music[bigData.selected.row].splice(bigData.selected.num,1);
                    if(bigData.music[bigData.selected.row].length==0){
                        bigData.music.splice(bigData.selected.row,1);
                        if(bigData.music[bigData.selected.row]!=undefined){
                            if(bigData.music[bigData.selected.row].length<=bigData.selected.num){
                                bigData.selected.num=bigData.music[bigData.selected.row].length-1;
                            }
                        }
                    }else{
                        if(bigData.music[bigData.selected.row].length<=bigData.selected.num){
                            bigData.selected.num=bigData.music[bigData.selected.row].length-1;
                        }
                    }


                    bigData.attached.row=undefined;
                    bigData.attached.num=undefined;


                    if(bigData.music.length==0){
                        let newNote=new Note(1,200,'sine',.5);
                        bigData.music[0]=[newNote.c(),newNote.c()];
                        bigData.selected.row=0;
                        bigData.selected.num=0;
                    }
                }
            }else if(evt.key=='Shift'){
                bigData.keyboard.shift=0;
            }

            if(bigData.keyboard.shift==1){
                if(bigData.interact.right){
                    if(bigData.music[bigData.selected.row].length>bigData.selected.num+1){
                        bigData.selected.num++;
                    }
                }
                if(bigData.interact.left){
                    if(bigData.selected.num-1>=0){
                        bigData.selected.num--;
                    }
                }
                if(bigData.interact.down){
                    if(bigData.music.length>bigData.selected.row+1){
                        bigData.selected.row++;
                        if(bigData.music[bigData.selected.row].length<=bigData.selected.num){
                            bigData.selected.num=bigData.music[bigData.selected.row].length-1;
                        }
                    }
                }
                if(bigData.interact.up){
                    if(bigData.selected.row-1>=0){
                        bigData.selected.row--;
                        if(bigData.music[bigData.selected.row].length<=bigData.selected.num){
                            bigData.selected.num=bigData.music[bigData.selected.row].length-1;
                        }
                    }
                }
                if(evt.key=='='||evt.key=='+'){
                    let newNote=new Note(1,200,'sine',.5);
                    bigData.music.splice(bigData.selected.row+1,0,[newNote.c(),newNote.c()]);
                    bigData.selected.row++;
                    bigData.selected.num=0;
                }
            }
    }
}

let keyManageInterval;

function keyManager(){
    updateInteraction();

    let qualifier=bigData.mainCanvas.width/640;
    if(bigData.keyboard.shift==0){
        if(bigData.interact.left)bigData.drawingOffset.x+=bigData.mainCanvas.width/100;
        if(bigData.interact.right)bigData.drawingOffset.x-=bigData.mainCanvas.width/100;
        if(bigData.drawingOffset.x>50*qualifier)bigData.drawingOffset.x=50*qualifier;

        if(bigData.music.length*bigData.noteHeight>(3/4)*bigData.mainCanvas.height){

            if(bigData.interact.down)bigData.drawingOffset.y-=bigData.mainCanvas.height/100;
            if(bigData.interact.up)bigData.drawingOffset.y+=bigData.mainCanvas.height/100;

            if(bigData.drawingOffset.y>0)bigData.drawingOffset.y=0;

            let tmp=bigData.music.length*bigData.noteHeight-(3/4)*bigData.mainCanvas.height;
            if( bigData.drawingOffset.y<-tmp )bigData.drawingOffset.y=-tmp;
        }
    }
    drawEverything();
}

function updateInteraction(){
    if(bigData.mouseInteract.right || bigData.keyboard.right){
        bigData.interact.right=1;
    }else{
        bigData.interact.right=0;
    }

    if(bigData.mouseInteract.left || bigData.keyboard.left){
        bigData.interact.left=1;
    }else{
        bigData.interact.left=0;
    }

    if(bigData.mouseInteract.up || bigData.keyboard.up){
        bigData.interact.up=1;
    }else{
        bigData.interact.up=0;
    }

    if(bigData.mouseInteract.down || bigData.keyboard.down){
        bigData.interact.down=1;
    }else{
        bigData.interact.down=0;
    }
}