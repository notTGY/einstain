let tricksToRender=[];
let trickTextOffset;

function ollie(){

    trickLine=[];
    if(speed<0){
        trickLine[trickLine.length]='switch';
    }
    trickLine[trickLine.length]='ollie';

    delay=8;
jumpInterval=setInterval( ()=>{//perform jump
    jump++;
    if(jump>0 && jump<=80){
        height+=1.5*JumpQualifier;pitch-=.01
    }

    if(jump>80 && jump<=120){
        height+=1*JumpQualifier;pitch+=.02
    }

    if(jump>120){
        height-=4*JumpQualifier
    }

    if(jump==160 || isFiasko || jump==0){
        clearInterval(jumpInterval);jump=0;
        if(!isFiasko){
            drawTrick(trickLine);
        }
    }
},5*slowMoQualifier);
}

function nollie(){

    trickLine=[];
    if(speed<0){
        trickLine[trickLine.length]='switch';
    }
    trickLine[trickLine.length]='nollie';



    delay=8;
jumpInterval=setInterval( ()=>{//perform jump
    jump++;
    if(jump>0 && jump<=80){
        height+=1.5*JumpQualifier;pitch+=.01
    }

    if(jump>80 && jump<=120){
        height+=1*JumpQualifier;pitch-=.02
    }

    if(jump>120){
        height-=4*JumpQualifier
    }

    if(jump==160 || isFiasko || jump==0){
        clearInterval(jumpInterval);jump=0;
        if(!isFiasko){
            drawTrick(trickLine);
        }
    }
},5*slowMoQualifier);
}


function kickflip(){

    trickLine[trickLine.length]='kickflip';



    delay=8;
flipInterval=setInterval( ()=>{//perform flip
    roll+=Math.PI/10;
    if(roll>=2*Math.PI || isFiasko){
            clearInterval(flipInterval);
            roll=0;
        }
},8*slowMoQualifier);
}

function heelflip(){

    trickLine[trickLine.length]='heelflip';

    delay=8;
roll=2*Math.PI;
flipInterval=setInterval( ()=>{//perform flip
    roll-=Math.PI/10;
    if(roll<=0 || isFiasko){
            clearInterval(flipInterval);
            roll=0;
        }
},8*slowMoQualifier);
}

function clockwise_shoveit(){

    trickLine[trickLine.length]='bs shoveit';

    delay=8;
shoveInterval=setInterval( ()=>{//perform thing
    yaw+=Math.PI/10;
    if(yaw>=Math.PI || isFiasko){
            clearInterval(shoveInterval);
            yaw=0;
        }
},17*slowMoQualifier);
}

function anticlockwise_shoveit(){

    trickLine[trickLine.length]='fs shoveit';

    delay=8;

shoveInterval=setInterval( ()=>{//perform thing
    yaw-=Math.PI/10;
    if(yaw<=-Math.PI || isFiasko){
            clearInterval(shoveInterval);
            yaw=0;
        }
},17*slowMoQualifier);
}




function drawTrick(trickSequence){
    convertSequenceToRender(trickSequence);
    canRenderTricks=true;
    trickTextOffset=50*canvas.width/CANVAS_WIDTH;
}

function renderDoneTricks(){
    if(!canRenderTricks)return -1;

    trickTextOffset-=speed*0.05;
    if(trickTextOffset<=-CANVAS_WIDTH*canvas.width/CANVAS_WIDTH){
        canRenderTricks=false;
    }

    if(tricksToRender[0]=='switch'){
        renderSwitch();
        renderTrick(tricksToRender[1]);
    }else{
        renderTrick(tricksToRender[0]);
    }
}

function renderSwitch(){
    let textSize=16*canvas.width/CANVAS_WIDTH;
    ctx.font=textSize+'px '+SECOND_FONT;
    trickTextOffset

    ctx.fillStyle=TRICK_SEQUENCE_COLOR;
    ctx.fillText('Switch',trickTextOffset,canvas.height/6);
}

function renderTrick(str){
    let textSize=16*canvas.width/CANVAS_WIDTH;
    ctx.font=textSize+'px '+SECOND_FONT;


    ctx.fillStyle=TRICK_SEQUENCE_COLOR;
    ctx.fillText(str,trickTextOffset+textSize*3.2,canvas.height/6);
}

