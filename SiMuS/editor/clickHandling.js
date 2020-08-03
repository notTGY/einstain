function clicker(evt){

    if(bigData.registeringEvents){

        evt.preventDefault();
        evt.stopPropagation();
        if(evt.which==1){
            leftClicker(evt);
            bigData.leftMousePressed=1;
        }else if(evt.which==3){
            rightClicker(evt);
        }

    }
}

function unclicker(evt){
    if(evt.which==1){
        checkButtons(evt);

        if(bigData.selected!=undefined && bigData.selected.row!=undefined && bigData.selected.num!=undefined){
            if(bigData.music[bigData.selected.row][bigData.selected.num].dur<=0){
                bigData.music[bigData.selected.row].splice(bigData.selected.num,1);
                if(bigData.music[bigData.selected.row].length==0){
                    bigData.music.splice(bigData.selected.row,1);
                    if(bigData.music[bigData.selected.row]!=undefined){
                        if(bigData.music[bigData.selected.row].length<=bigData.selected.num){
                            bigData.selected.num=bigData.music[bigData.selected.row].length-1;
                        }
                    }else{
                        bigData.selected.row--;
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
        }
        bigData.leftMousePressed=0;
        bigData.attached={row:undefined,num:undefined};
    }
}


function mouseMover(evt){
    //movement of camera
    if(evt.x>bigData.mainCanvas.width*9/10){
        bigData.mouseInteract.right=1;
    }else{
        bigData.mouseInteract.right=0;
    }

    if(evt.x<bigData.mainCanvas.width*1/10){
        bigData.mouseInteract.left=1;
    }else{
        bigData.mouseInteract.left=0;
    }

    if(evt.y>bigData.mainCanvas.height*9/10){
        bigData.mouseInteract.down=1;
    }else{
        bigData.mouseInteract.down=0;
    }

    if(evt.y<bigData.mainCanvas.height*1/10){
        bigData.mouseInteract.up=1;
    }else{
        bigData.mouseInteract.up=0;
    }

    //changing duration of attached note
    if(bigData.leftMousePressed){
        if(bigData.attached!=undefined && bigData.attached.row!=undefined && bigData.attached.num!= undefined){
            let pixelsToDur1Sec=bigData.stdNoteWidth*bigData.mainCanvas.width/640;

            let row=bigData.attached.row;
            let num=bigData.attached.num;

            let previousX=bigData.drawingOffset.x;
            for(let i=0;i<num;i++){
                let w=bigData.secondNoteWidth*bigData.music[row][i].dur;
                previousX+=w;
            }
            let newDur=(evt.x-previousX)/pixelsToDur1Sec;

            bigData.music[bigData.attached.row][bigData.attached.num].dur=newDur;

            if(bigData.music[bigData.attached.row][bigData.attached.num].dur<0)bigData.music[bigData.attached.row][bigData.attached.num].dur=0;
        }
    }

}



function leftClicker(evt){
    tryToAddNewRow(evt);


    let index=recogniseRightBoundOfNote(evt.x,evt.y);

    if(index!=undefined){
        bigData.attached.row=index.row;
        bigData.attached.num=index.num;

        bigData.selected.row=index.row;
        bigData.selected.num=index.num;
    }else{
        index=recogniseCenterOfNote(evt.x,evt.y);
        if(index!=undefined){
            bigData.selected.row=index.row;
            bigData.selected.num=index.num;

            let typeOfNote=bigData.music[index.row][index.num].type;
            bigData.music[index.row][index.num].type=swapTypeOfNote(typeOfNote);
        }
    }

    tryToRecogniseSelection(evt.x,evt.y);

    let qualifier=bigData.mainCanvas.width/640;
    let w=50*qualifier;
    let x=y=10*qualifier;
    let h=bigData.mainCanvas.height/4;
    let width=myMin((w-20*qualifier)/2,h/2);

    if(evt.x<x+width*2 && evt.x>x ){
        if(evt.y>y && evt.y<y+width*2){
            if(bigData.playing==0){
                bigData.playing=1;
                SMSplayNotes(bigData.music,bigData.audioCtx,0);
            }else{
                bigData.playing=0;
            }
        }
    }

    drawEverything();
}


function recogniseRightBoundOfNote(x,y){
    let matchingHeight0=bigData.drawingOffset.y+bigData.mainCanvas.height/4+bigData.noteHeight/2;
    let answer={row:undefined,num:undefined};
    for(let i=0;i<bigData.music.length;i++){
        let matchingHeight=matchingHeight0+bigData.noteHeight*i;
        if(y>matchingHeight-bigData.noteHeight*3/8 && y<matchingHeight+bigData.noteHeight*3/8){
            answer.row=i;
            let matchingX=bigData.drawingOffset.x;
            for(let j=0;j<bigData.music[answer.row].length;j++){
                let w=bigData.secondNoteWidth*bigData.music[answer.row][j].dur;
                matchingX+=w;
                if(x>matchingX-bigData.secondNoteWidth/30 && x<matchingX+bigData.secondNoteWidth/30){
                    answer.num=j;
                }
            }
        }
    }
    if(answer.row==undefined || answer.num==undefined)return undefined;
    return answer;
}

function recogniseCenterOfNote(x,y){
    let matchingHeight0=bigData.drawingOffset.y+bigData.mainCanvas.height/4+bigData.noteHeight/2;
    let answer={row:undefined,num:undefined};
    for(let i=0;i<bigData.music.length;i++){
        let matchingHeight=matchingHeight0+bigData.noteHeight*i;
        if(y>matchingHeight-bigData.noteHeight*1/8 && y<matchingHeight+bigData.noteHeight*1/8){
            answer.row=i;
            let matchingX=bigData.drawingOffset.x;
            for(let j=0;j<bigData.music[answer.row].length;j++){
                let w=bigData.secondNoteWidth*bigData.music[answer.row][j].dur;
                if(x>matchingX+w/2-bigData.noteHeight*1/8 && x<matchingX+w/2+bigData.noteHeight*1/8 ){
                    answer.num=j;
                }
                matchingX+=w;
            }
        }
    }
    if(answer.row==undefined || answer.num==undefined)return undefined;
    return answer;
}




function rightClicker(evt){
    let newNote=new Note(1,200,'sine',.5);
    let index=recogniseRightBoundOfNote(evt.x,evt.y);
    if(index!=undefined){
        bigData.music[index.row].splice(index.num+1,0,newNote.c());
        bigData.selected.num++;
    }

    drawEverything();
}

function swapTypeOfNote(type){
    let arrayOfTypes=['sine','square','triangle','sawtooth'];
    let summary=undefined;
    for(let i=0;i<arrayOfTypes.length;i++){
        if(arrayOfTypes[i]==type)summary=i+1;
    }
    if(summary==undefined)return 'sine';

    if(summary>=arrayOfTypes.length)summary%=arrayOfTypes.length;
    return arrayOfTypes[summary];
}

function tryToAddNewRow(evt){
    if(bigData.drawingOffset.x>0){
        if(evt.x<bigData.drawingOffset.x){
            let summary=undefined;
            let matchingHeight0=bigData.drawingOffset.y+bigData.mainCanvas.height/4;
            let height=bigData.noteHeight;
            for(let i=0;i<bigData.music.length;i++){
                let matchingHeight=matchingHeight0+i*height;
                if(evt.y>matchingHeight && evt.y<matchingHeight+height)summary=i;
            }
            if(summary!=undefined){
                let newNote=new Note(1,200,'sine',.5);
                bigData.music.splice(summary+1,0,[newNote.c(),newNote.c()]);
            }
        }
    }
}

function tryToRecogniseSelection(x,y){
    let matchingHeight0=bigData.drawingOffset.y+bigData.mainCanvas.height/4;
    let answer={row:undefined,num:undefined};
    for(let i=0;i<bigData.music.length;i++){
        let matchingHeight=matchingHeight0+bigData.noteHeight*i;
        if(y>matchingHeight && y<matchingHeight+bigData.noteHeight){
            answer.row=i;
            let matchingX=bigData.drawingOffset.x;
            for(let j=0;j<bigData.music[answer.row].length;j++){
                let w=bigData.secondNoteWidth*bigData.music[answer.row][j].dur;
                if(x>matchingX && x<matchingX+w ){
                    answer.num=j;
                }
                matchingX+=w;
            }
        }
    }
    if(answer==undefined || answer.row==undefined || answer.num==undefined)return undefined;


    bigData.selected={row:answer.row,num:answer.num};
}