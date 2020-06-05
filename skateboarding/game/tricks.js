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
    console.log(trickSequence);                                                 //FIX ME
}
