let tricksToRender=[];


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
    setTimeout( ()=>{
        canRenderTricks=false;
    },2000*slowMoQualifier)
}

function renderDoneTricks(){
    if(!canRenderTricks)return -1;

    if(tricksToRender[0]=='switch'){
        renderSwitch();
        renderTrick(tricksToRender[1]);
    }else{
        renderTrick(tricksToRender[0]);
    }
}

function renderSwitch(){
    let textSize=8*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize*2;
    ctx.font=textSize+'px '+SECOND_FONT;


    ctx.fillStyle=TRICK_SEQUENCE_COLOR;
    ctx.fillText('Switch',canvas.width/2-textOffset,canvas.height/6);
}

function renderTrick(str){
    let textSize=8*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize*2;
    ctx.font=textSize+'px '+SECOND_FONT;


    ctx.fillStyle=TRICK_SEQUENCE_COLOR;
    ctx.fillText(str,canvas.width/2+textOffset*0.5,canvas.height/6);
}

function convertSequenceToRender(trickSequence){
    tricksToRender=[...trickSequence];

    if(tricksToRender[0]=='switch'){//removing useless ollies like     ollie kickflip-> kickflip
        if(tricksToRender.length>=3 && tricksToRender[1]=='ollie'){
            let buffer=[];
            buffer[0]=tricksToRender[0];
            for(let i=2;i<tricksToRender.length;i++){
                buffer[i-1]=tricksToRender[i];
            }
            tricksToRender=[...buffer];
        }
    }else if(tricksToRender[0]=='ollie' && tricksToRender.length>=2){
        let buffer=[];
        for(let i=1;i<tricksToRender.length;i++){
            buffer[i-1]=tricksToRender[i];
        }
        tricksToRender=[...buffer];
    }

    if(tricksToRender[0]=='switch'){//We actually distinguishing tricks
        if(0){//for reading and copy-pasting purposes
        }else if(tricksToRender.length==3 && tricksToRender[1]==tricksToRender[2]){// SWITCH
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='double ';
            }else{
                buffer='360 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;
        }else if(tricksToRender.length==4 && tricksToRender[1]==tricksToRender[2] && tricksToRender[1]==tricksToRender[3]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='triple ';
            }else{
                buffer='540 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;
        }else if(tricksToRender.length==5 && tricksToRender[1]==tricksToRender[2] && tricksToRender[1]==tricksToRender[3] && tricksToRender[1]==tricksToRender[4]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='quad ';
            }else{
                buffer='720 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;

        }else if(tricksToRender[1]=='nollie'){                  //SWITCH  NOLLIE
            if(0){//for reading and copy-pasting purposes
            }else if(tricksToRender.length==4 && tricksToRender[3]==tricksToRender[2]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='double ';
                }else{
                    buffer='360 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='fakie '+buffer;
            }else if(tricksToRender.length==5 && tricksToRender[3]==tricksToRender[2] && tricksToRender[4]==tricksToRender[3]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='triple ';
                }else{
                    buffer='540 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='fakie '+buffer;
            }else if(tricksToRender.length==6 && tricksToRender[3]==tricksToRender[2] && tricksToRender[3]==tricksToRender[5] && tricksToRender[3]==tricksToRender[4]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='quad ';
                }else{
                    buffer='720 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='fakie '+buffer;

            }else{//basic case of switch nollie
                let buffer='';
                for(let i=1;i<tricksToRender.length;i++){
                    buffer+=tricksToRender[i]+' ';
                }
                tricksToRender=[];
                tricksToRender[0]='switch';
                tricksToRender[1]=buffer;
            }

        }else{//basic case of switch
            let buffer='';
            for(let i=1;i<tricksToRender.length;i++){
                buffer+=tricksToRender[i]+' ';
            }
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;
        }
        }else{//no switch
        if(0){//for reading and copy-pasting purposes
        }else if(tricksToRender.length==2 && tricksToRender[0]==tricksToRender[1]){//REGULAR
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='double ';
            }else{
                buffer='360 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]=buffer;
        }else if(tricksToRender.length==3 && tricksToRender[1]==tricksToRender[0] && tricksToRender[1]==tricksToRender[2]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='triple ';
            }else{
                buffer='540 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]=buffer;
        }else if(tricksToRender.length==4 && tricksToRender[1]==tricksToRender[0] && tricksToRender[1]==tricksToRender[3] && tricksToRender[1]==tricksToRender[2]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='quad ';
            }else{
                buffer='720 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]=buffer;

        }else if(tricksToRender[0]=='nollie'){                  //REGULAR NOLLIE
            if(0){//for reading and copy-pasting purposes
            }else if(tricksToRender.length==3 && tricksToRender[1]==tricksToRender[2]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='double ';
                }else{
                    buffer='360 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='nollie '+buffer;
            }else if(tricksToRender.length==4 && tricksToRender[3]==tricksToRender[2] && tricksToRender[1]==tricksToRender[3]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='triple ';
                }else{
                    buffer='540 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='nollie '+buffer;
            }else if(tricksToRender.length==5 && tricksToRender[3]==tricksToRender[2] && tricksToRender[3]==tricksToRender[1] && tricksToRender[3]==tricksToRender[4]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='quad ';
                }else{
                    buffer='720 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='nollie '+buffer;

            }else{//basic case of regular nollie
                let buffer='';
                for(let i=0;i<tricksToRender.length;i++){
                    buffer+=tricksToRender[i]+' ';
                }
                tricksToRender=[];
                tricksToRender[0]=buffer;
            }
            
        }else{//basic case of regular
            let buffer='';
            for(let i=0;i<tricksToRender.length;i++){
                buffer+=tricksToRender[i]+' ';
            }
            tricksToRender=[];
            tricksToRender[0]=buffer;
        }


    }


}