function clicker(evt){
    evt.preventDefault();
    evt.stopPropagation();
    if(evt.which==1){
        leftClicker(evt);
        bigData.leftMousePressed=1;
    }else if(evt.which==3){
        rightClicker(evt);
    }
}

function unclicker(evt){
    if(evt.which==1){
        if(bigData.attached!=undefined && bigData.attached.row!=undefined && bigData.attached.num!= undefined){
            if(bigData.music[bigData.attached.row][bigData.attached.num].dur<=0){
                bigData.music[bigData.attached.row].splice(bigData.attached.num,1);
                bigData.selected.row=undefined;
                bigData.selected.num=undefined;
            }
            bigData.attached.row=undefined;
            bigData.attached.num=undefined;
        }
        bigData.leftMousePressed=0;
        bigData.attached={row:undefined,num:undefined};
    }
}


function mouseMover(evt){
    if(evt.x>bigData.mainCanvas.width*9/10){

    }
    if(evt.x<bigData.mainCanvas.width*1/10){

    }


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
    if(bigData.attached!=undefined && bigData.attached.row!=undefined && bigData.attached.num!= undefined){
        if(bigData.music[bigData.attached.row][bigData.attached.num].dur<=0){
            bigData.music[bigData.attached.row].splice(bigData.attached.num,1);
            bigData.selected.row=undefined;
            bigData.selected.num=undefined;
        }
        bigData.attached.row=undefined;
        bigData.attached.num=undefined;
    }else{
        let newNote=new Note(1,200,'sine',.5);
        let index=recogniseRightBoundOfNote(evt.x,evt.y);
        if(index!=undefined){
            bigData.music[index.row].splice(index.num+1,0,newNote.c());
            bigData.selected.num++;
        }
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