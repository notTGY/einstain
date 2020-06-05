function passOnInteractionToTitles(evt){
    if(determineZone(evt)==1){
        scene='start';
        drawStartScreen();
    }
}

function drawTitles(isFromResized){
    isFiasko=false;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    roll=0;
    yaw=0;
    offset=SK8_OFFSET_FROM_LEFT;

    let intensity=10;
    let increasing=true;
    if(isFromResized==undefined){
    titlesInterval=setInterval(()=>{
        if(scene=='start'){
            clearInterval(titlesInterval);
        }else{

        setColor(CONCRETE_COLOR);ctx.fillRect(0,canvas.height-CONCRETE_HEIGHT,canvas.width,CONCRETE_HEIGHT);//draw concrete
        setColor(BACKGROUND_COLOR);ctx.fillRect(0,0,canvas.width,canvas.height-CONCRETE_HEIGHT);//draw wall

        drawSkateboard(height,pitch,roll,yaw);

        displayTitles(intensity);

        if(increasing){
            intensity++;
            if(intensity>=99){
                increasing=false;
            }
        }else{
            intensity--;
            if(intensity<=10){
                increasing=true;
            }
        }
        }
    },30);
    }
}

function displayTitles(intensity){
    ctx.fillStyle='#00'+ intensity +'00';

    let textSize=12*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize*10;
    ctx.font=textSize+'px '+THIRD_FONT;

    ctx.fillText('Your ads could have been there',canvas.width/2-textOffset,canvas.height/2);   //FIX ME


    ctx.fillStyle=GO_BACK_OVERLAY_COLOR;
    textSize=12*canvas.width/CANVAS_WIDTH;
    textOffset=textSize*8;
    ctx.font=textSize+'px '+SECOND_FONT;

    ctx.fillText('tap right to go back',canvas.width-textOffset,textSize);
}
