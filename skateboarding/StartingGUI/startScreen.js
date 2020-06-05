function drawStartScreen(){
    isFiasko=false;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    roll=0;
    yaw=0;
    offset=SK8_OFFSET_FROM_LEFT;

    setColor(CONCRETE_COLOR);ctx.fillRect(0,canvas.height-CONCRETE_HEIGHT,canvas.width,CONCRETE_HEIGHT);//draw concrete
    setColor(BACKGROUND_COLOR);ctx.fillRect(0,0,canvas.width,canvas.height-CONCRETE_HEIGHT);//draw wall

    drawSkateboard(height,pitch,roll,yaw);


    drawTitle();

    drawInstructions();
}



function passOnInteractionToStartScreen(evt){
    if(determineZone(evt)==2){
        //start the game
        scene='game';
        initialization();
    }else if(determineZone(evt)==1){
        //proceed to tutorial scene
        scene='tutorial';
        currentPage=0;
        doFiasko();
        drawTutorial(currentPage);
    }else if(determineZone(evt)==3){
        //proceed to credits page
        scene='titles';
        drawTitles();
    }
}

function drawTitle(){
    let textSize=30*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize*4;
    ctx.font=textSize+'px "Comic Sans MS", cursive, sans-serif';

    ctx.strokeStyle='#ffcd3c';
    ctx.lineWidth=5;
    ctx.strokeText('Skateboardin`',canvas.width/2-textOffset,canvas.height/2);

    ctx.fillStyle='#ff9234';
    ctx.fillText('Skateboardin`',canvas.width/2-textOffset,canvas.height/2);
}


function drawInstructions(){
    let textSize=6*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize*8;
    ctx.font=textSize+'px Impact, Charcoal, sans-serif';
    ctx.fillStyle='#f6cd61';
    ctx.fillText('tap down to play',canvas.width/2-textOffset,3*canvas.height/4);

    textSize=6*canvas.width/CANVAS_WIDTH;
    textOffset=textSize*8;

    ctx.fillText('tap right to watch tutorial',3*canvas.width/4-textOffset,4*canvas.height/7);

    textSize=6*canvas.width/CANVAS_WIDTH;
    textOffset=textSize*8;

    ctx.fillText('tap left to see credits',canvas.width/4-textOffset,4*canvas.height/7);
}