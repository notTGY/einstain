function passOnInteractionToTutorial(evt){

    if(determineZone(evt)==3){
        currentPage=0;
        scene='start';

        doFiasko();

        drawStartScreen();
    }
    if(determineZone(evt)==4){
        if(currentPage>=1){
            currentPage--;

            doFiasko();
            drawTutorial(currentPage);
        }
    }
    if(determineZone(evt)==2){
        if(currentPage<=4){
            currentPage++;

            doFiasko();
            drawTutorial(currentPage);
        }
    }
}



function drawTutorial(page){
    isFiasko=false;

    delay=0;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    speed=STARTING_SPEED;
    jump=0;
    yaw=0;
    roll=0;
    shades=0;

    offset=SK8_OFFSET_FROM_LEFT;

    mainInterval=setInterval( ()=>{
        delay=0;

        setColor(CONCRETE_COLOR);ctx.fillRect(0,canvas.height-CONCRETE_HEIGHT,canvas.width,CONCRETE_HEIGHT);//draw concrete
        setColor(BACKGROUND_COLOR);ctx.fillRect(0,0,canvas.width,canvas.height-CONCRETE_HEIGHT);//draw wall

        shadeManagement();

        drawSkateboard(height,pitch,roll,yaw,shades);

        displayTutorial(currentPage);
    },17*slowMoQualifier);
}

function displayTutorial(page){
    ctx.fillStyle=GO_BACK_OVERLAY_COLOR;
    let textSize=12*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize;
    ctx.font=textSize+'px '+SECOND_FONT;

    ctx.fillText('tap left to go back',textOffset,textSize);

    ctx.fillText('tap up&down to go between pages',textOffset,(7/6)*textOffset*10/4);

    ctx.fillStyle=TUTORIAL_SECONDARY_COLOR;
    textOffset=textSize;

    ctx.fillText('you can also use WASD and arrow keys',textOffset,canvas.height-textOffset);

    if(page==0){
        if(jump==0){
            ollie();
        }


        ctx.fillStyle=TUTORIAL_COLOR;
        textSize=14*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px '+SECOND_FONT;

        ctx.fillText('tap left to do ollie',canvas.width/2-textOffset,canvas.height/2);

    }else if(page==1){
        if(jump==0){
            nollie();
        }


        ctx.fillStyle=TUTORIAL_COLOR;
        textSize=14*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px '+SECOND_FONT;

        ctx.fillText('tap right to do nollie',canvas.width/2-textOffset,canvas.height/2);

    }else if(page==2){
        if(jump==0){
            ollie();
            setTimeout(TutorialKickflip(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle=TUTORIAL_COLOR;
        textSize=14*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px '+SECOND_FONT;

        ctx.fillText('tap up while in the air to do kickflip',canvas.width/2-textOffset,canvas.height/2);
    }else if(page==3){
        if(jump==0){
            ollie();
            setTimeout(TutorialHeelflip(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle=TUTORIAL_COLOR;
        textSize=14*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px '+SECOND_FONT;

        ctx.fillText('tap down while in the air to do heelflip',canvas.width/2-textOffset,canvas.height/2);
    }else if(page==4){
        if(jump==0){
            ollie();
            setTimeout(TutorialBsShoveit(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle=TUTORIAL_COLOR;
        textSize=14*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px '+SECOND_FONT;

        ctx.fillText('tap right while in the air to do fs shove-it',canvas.width/2-textOffset,canvas.height/2);
    }else if(page==5){
        if(jump==0){
            ollie();
            setTimeout(TutorialFsShoveit(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle=TUTORIAL_COLOR;
        textSize=14*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px '+SECOND_FONT;

        ctx.fillText('tap left while in the air to do bs shove-it',canvas.width/2-textOffset,canvas.height/2);
    }
}

function TutorialKickflip(page){
    if(currentPage==page && scene=='tutorial'){kickflip();}
}

function TutorialHeelflip(page){
    if(currentPage==page && scene=='tutorial'){heelflip();}
}

function TutorialBsShoveit(page){
    if(currentPage==page && scene=='tutorial'){clockwise_shoveit();}
}

function TutorialFsShoveit(page){
    if(currentPage==page && scene=='tutorial'){anticlockwise_shoveit();}
}
