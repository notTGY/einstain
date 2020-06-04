const CANVAS_WIDTH=300;
const CANVAS_HEIGHT=300;
let ctx,canvas;

let mainInterval,jumpInterval,flipInterval,shoveInterval;

let trickLine=[];

let isFiasko=false;

let currentPage=0;

let delay=0;

let slowMoQualifier=1;

let IwantToUseSmallerCavas=false;

//changing constants
let JumpQualifier;

let SK8_OFFSET_FROM_LEFT;
let SK8_WIDTH;
let SK8_FROM_CENTER_TO_WHEEL;
let SK8_HEIGHT;
let SK8_THICK;
let WHEEL_RADIUS;
let BOLTS_RADIUS;

let CONCRETE_HEIGHT;

let DRAIN_WIDTH;
let DRAIN_HEIGHT;

let QUATERPIPE_SIZE;

let QUATERPIPE_THICK;

let STARTING_SPEED;

let SPEEDTHINGS_WIDTH;
let SPEEDTHINGS_HEIGHT;

let SPEEDTHINGIES;
let DRAINS;
let QUATERPIPE;
let BACKQUATERPIPE;

//game frequent changing things
let offset;

let height;
let pitch;
let speed;
let jump;
let roll;
let yaw;

let speedPiece;
let drain;
let quaterPipe;
let backQuaterPipe;

let scene='start';


function myMin(x,y){
    if(x>y)return y;
    return x;
}

function whenResized(){
    //change height and width of CANVAS
    let tmp=myMin(window.innerWidth,window.innerHeight);

    canvas.width=tmp;
    canvas.height=tmp;

    if(IwantToUseSmallerCavas){
            canvas.width=CANVAS_WIDTH;
            canvas.height=CANVAS_HEIGHT;
    }


    ctx=canvas.getContext`2d`;
    // change constants of graphics and jumping

    let tmp1=canvas.width/CANVAS_WIDTH;
    let tmp2=canvas.height/CANVAS_HEIGHT;

    JumpQualifier=constants.JumpQualifier*tmp2;

    SK8_OFFSET_FROM_LEFT=constants.SK8_OFFSET_FROM_LEFT*tmp1;
    SK8_WIDTH=constants.SK8_WIDTH*tmp1;
    SK8_FROM_CENTER_TO_WHEEL=constants.SK8_FROM_CENTER_TO_WHEEL*tmp1;
    SK8_HEIGHT=constants.SK8_HEIGHT*tmp2;
    SK8_THICK=constants.SK8_THICK*tmp2;
    WHEEL_RADIUS=constants.WHEEL_RADIUS*tmp2;
    BOLTS_RADIUS=constants.BOLTS_RADIUS*tmp2;
    CONCRETE_HEIGHT=constants.CONCRETE_HEIGHT*tmp2;
    DRAIN_WIDTH=constants.DRAIN_WIDTH*tmp1;
    DRAIN_HEIGHT=constants.DRAIN_HEIGHT*tmp2;
    QUATERPIPE_SIZE=constants.QUATERPIPE_SIZE*myMin(tmp1,tmp2);
    QUATERPIPE_THICK=constants.QUATERPIPE_THICK*tmp1;
    STARTING_SPEED=constants.STARTING_SPEED*tmp1;
    SPEEDTHINGS_WIDTH=constants.SPEEDTHINGS_WIDTH*tmp1;
    SPEEDTHINGS_HEIGHT=constants.SPEEDTHINGS_HEIGHT*tmp2;

    SPEEDTHINGIES=[];
    for(let i=0;i<constants.SPEEDTHINGIES.length;i++){
        SPEEDTHINGIES[i]=constants.SPEEDTHINGIES[i]*tmp1;
    }

    DRAINS=[];
    for(let i=0;i<constants.DRAINS.length;i++){
        DRAINS[i]=constants.DRAINS[i]*tmp1;
    }

    QUATERPIPE=constants.QUATERPIPE*tmp1;
    BACKQUATERPIPE=constants.BACKQUATERPIPE*tmp1;


    if(mainInterval!=undefined){
        doFiasko();
        setTimeout(initialization,1500);
    }

    if(scene=='start'){drawStartScreen()}

    if(scene=='tutorial'){
            doFiasko();
            drawTutorial(currentPage);
        }

    if(scene=='titles'){drawTitles('abracadabra!')}
}


function drawCircle(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI,1);ctx.fill()}

function setColor(color){ctx.fillStyle=color}





function doFiasko(){
    clearInterval(mainInterval);
    clearInterval(jumpInterval);
    clearInterval(flipInterval);
    clearInterval(shoveInterval);
    isFiasko=true;
    //setTimeout(initialization,1500);
    //doing job of taking out the rubbish
    delay=0;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    speed=STARTING_SPEED;
    jump=0;
    yaw=0;
    roll=0;

    offset=SK8_OFFSET_FROM_LEFT;

    speedPiece=[...SPEEDTHINGIES];
    drain=[...DRAINS];
    quaterPipe=QUATERPIPE;
    backQuaterPipe=BACKQUATERPIPE;
}



function drainManagement(){//draw and move drains
    setColor(DRAIN_COLOR);
    for(j=0;j<drain.length;j++){
        drain[j]-=speed/10;

        if(drain[j]-DRAIN_WIDTH/2<canvas.width && drain[j]>-DRAIN_WIDTH/2){

            ctx.fillRect(drain[j]-DRAIN_WIDTH/2,canvas.height-CONCRETE_HEIGHT,DRAIN_WIDTH,DRAIN_HEIGHT);

            if( (drain[j]<(offset+SK8_WIDTH/2+SK8_FROM_CENTER_TO_WHEEL+DRAIN_WIDTH/2)) && (drain[j]>(offset+SK8_WIDTH/2-SK8_FROM_CENTER_TO_WHEEL-DRAIN_WIDTH/2)) && jump==0 ){
                doFiasko();
                setTimeout(initialization,1500);
            }
        }
    }
}





function drawSpeedThingies(){     //draw grey rects that create illusion of speed
    setColor(SPEEDTHINGS_COLOR);
    for(j=0;j<speedPiece.length;j++){
        if(speedPiece[j]<-SPEEDTHINGS_WIDTH && speed>=0)speedPiece[j]=canvas.width+SPEEDTHINGS_WIDTH;
        if(speedPiece[j]>canvas.width+SPEEDTHINGS_WIDTH && speed<0)speedPiece[j]=-SPEEDTHINGS_WIDTH;

        if(speed>=0)speedPiece[j]-=speed/10;
        if(speed<0)speedPiece[j]+=Math.abs(speed/10);

        ctx.fillRect(speedPiece[j],canvas.height-CONCRETE_HEIGHT/2,SPEEDTHINGS_WIDTH,SPEEDTHINGS_HEIGHT)
    }
}


function pipeManagement(){
    let transformation=STARTING_SPEED/constants.STARTING_SPEED;

    backQuaterPipe-=speed/10;//moving pipes
    quaterPipe-=speed/10;

    if(quaterPipe-QUATERPIPE_SIZE<=canvas.width){//drawing pipes
        drawQuater(quaterPipe-QUATERPIPE_SIZE,canvas.height-(CONCRETE_HEIGHT+QUATERPIPE_SIZE));
    }
    if(backQuaterPipe+QUATERPIPE_SIZE>=0){
        drawBackQuater(backQuaterPipe,canvas.height-(CONCRETE_HEIGHT+QUATERPIPE_SIZE));
    }
    //detecting collisions with pipes
    if(jump!=0 && speed>=0 && quaterPipe-QUATERPIPE_SIZE<=SK8_OFFSET_FROM_LEFT+SK8_WIDTH && quaterPipe-QUATERPIPE_SIZE>=SK8_OFFSET_FROM_LEFT+SK8_WIDTH-QUATERPIPE_SIZE){
        doFiasko();
        setTimeout(initialization,1500);
    }
    if(jump!=0 && speed<0 && backQuaterPipe+QUATERPIPE_SIZE>=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH && backQuaterPipe+QUATERPIPE_SIZE>=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH +QUATERPIPE_SIZE){
        doFiasko();
        setTimeout(initialization,1500);
    }


    //if we are in pipes
    //when we ride quaterPipe
    if(quaterPipe-QUATERPIPE_SIZE<=SK8_OFFSET_FROM_LEFT+SK8_WIDTH/2+SK8_FROM_CENTER_TO_WHEEL){
        speed-=1*transformation;
        let tmp=speed/STARTING_SPEED;
        if(speed>=0){
            height+=1*JumpQualifier*tmp;
            pitch-=0.04*tmp;
            if(tmp==0){
                pitch-=0.04;
                height+=1*JumpQualifier;
            }
        }else if(speed<0){
            height+=1*JumpQualifier*tmp;
            pitch-=0.04*tmp;
            if(speed== (-STARTING_SPEED)){
                pitch=0;
            }
        }
    }
    //when we ride backQuaterPipe
    if(backQuaterPipe+QUATERPIPE_SIZE>=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH/2-SK8_FROM_CENTER_TO_WHEEL){
        speed+=1*transformation;
        let tmp=speed/STARTING_SPEED;
        if(speed<=0){
            height-=1*JumpQualifier*tmp;
            pitch-=0.04*tmp;
            if(tmp==0){
                pitch+=0.04;
                height+=1*JumpQualifier;
            }
        }else if(speed>0){
            height-=1*JumpQualifier*tmp;
            pitch-=0.04*tmp;
            if(speed==(STARTING_SPEED)){
                pitch=0;
            }
        }
    }
    //when we leave quaterPipe
    if(quaterPipe-QUATERPIPE_SIZE-10*transformation<=SK8_OFFSET_FROM_LEFT+SK8_WIDTH/2+SK8_FROM_CENTER_TO_WHEEL){
        if(quaterPipe-QUATERPIPE_SIZE>=SK8_OFFSET_FROM_LEFT+SK8_WIDTH/2+SK8_FROM_CENTER_TO_WHEEL){
            if(speed<0){
            pitch=0;
            height=CONCRETE_HEIGHT+SK8_HEIGHT;
            offset=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH;
            if(jump!=0){
            jump=159;
            }
            }
        }
    }
    //when we leave backQuaterPipe
    if(backQuaterPipe+QUATERPIPE_SIZE+10*transformation>=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH/2-SK8_FROM_CENTER_TO_WHEEL){
        if(backQuaterPipe+QUATERPIPE_SIZE<=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH/2-SK8_FROM_CENTER_TO_WHEEL){
            if(speed>0){
            pitch=0;
            height=CONCRETE_HEIGHT+SK8_HEIGHT;
            offset=SK8_OFFSET_FROM_LEFT;
            if(jump!=0){
            jump=159;
            }
            }
        }
    }

}

function drawQuater(x,y){
    setColor(QUATERPIPE_COLOR);
    ctx.fillRect(x,y,QUATERPIPE_SIZE+QUATERPIPE_THICK,QUATERPIPE_SIZE);
    setColor(BACKGROUND_COLOR);
    drawCircle(x,y,QUATERPIPE_SIZE);
}

function drawBackQuater(x,y){
    setColor(QUATERPIPE_COLOR);
    ctx.fillRect(x-QUATERPIPE_THICK,y,QUATERPIPE_SIZE+QUATERPIPE_THICK,QUATERPIPE_SIZE);
    setColor(BACKGROUND_COLOR);
    drawCircle(x+QUATERPIPE_SIZE,y,QUATERPIPE_SIZE);
}


function drawSkateboard(h,a,r,y){


    let width=SK8_WIDTH*Math.cos(y); //what changes when you turn yaw
    let to_wheel=SK8_FROM_CENTER_TO_WHEEL*Math.cos(y);
    let thick=SK8_THICK;
    let r1=WHEEL_RADIUS*(1+Math.sin(y)*0.3);
    let lilr1=BOLTS_RADIUS*(1+Math.sin(y)*0.3);
    let r2=WHEEL_RADIUS*(1-Math.sin(y)*0.3);
    let lilr2=BOLTS_RADIUS*(1-Math.sin(y)*0.3);//yaw ends here

    r1=r1*(.1+Math.abs(Math.cos(r)));//roll to wheels
    r2=r2*(.1+Math.abs(Math.cos(r)));
    lilr1=lilr1*(.1+Math.abs(Math.cos(r)));
    lilr2=lilr2*(.1+Math.abs(Math.cos(r)));


    let smallerThick=thick*0.7+thick*Math.abs(Math.sin(r)*0.9);
    thick=thick*0.5+thick/(1.1-Math.abs(Math.sin(r)));//roll body

    //offset=SK8_OFFSET_FROM_LEFT;
    //if(speed<0){offset=canvas.width-offset-SK8_WIDTH;}


    ctx.translate(offset+SK8_WIDTH/2,canvas.height-h);//drawing skateboard
    ctx.rotate(a);


    if(r<Math.PI){
        let wheelHeight=smallerThick*Math.cos(r);

        setColor(WHEEL_COLOR);drawCircle(-to_wheel,wheelHeight+r1,r1);//drawing wheels first
        setColor(BOLTS_COLOR);drawCircle(-to_wheel,wheelHeight+r1,lilr1);

        setColor(WHEEL_COLOR);drawCircle(to_wheel,wheelHeight+r2,r2);
        setColor(BOLTS_COLOR);drawCircle(to_wheel,wheelHeight+r2,lilr2);

        setColor(DECK_COLOR);ctx.fillRect(-width/2,0,width,smallerThick);//draw brown thing first
        setColor(GRIPTAPE_COLOR);ctx.fillRect(-width/2,-thick,width,thick);
    }else{
        let wheelHeight=thick*Math.cos(r);

        setColor(GRIPTAPE_COLOR);ctx.fillRect(-width/2,0,width,smallerThick);//draw black thing first
        setColor(DECK_COLOR);ctx.fillRect(-width/2,-thick,width,thick);

        setColor(WHEEL_COLOR);drawCircle(-to_wheel,-(r1+wheelHeight),r1);//drawing wheels after everything else
        setColor(BOLTS_COLOR);drawCircle(-to_wheel,-(r1+wheelHeight),lilr1);

        setColor(WHEEL_COLOR);drawCircle(to_wheel,-(r2+wheelHeight),r2);
        setColor(BOLTS_COLOR);drawCircle(to_wheel,-(r2+wheelHeight),lilr2);
    }

    ctx.rotate(-a);
    ctx.translate(-(offset+SK8_WIDTH/2),h-canvas.height);
}



function initialization(){//every game start (when you die)
    if(scene=='game'){

    isFiasko=false;

    delay=0;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    speed=STARTING_SPEED;
    jump=0;
    yaw=0;
    roll=0;

    offset=SK8_OFFSET_FROM_LEFT;

    speedPiece=[...SPEEDTHINGIES];
    drain=[...DRAINS];
    quaterPipe=QUATERPIPE;
    backQuaterPipe=BACKQUATERPIPE;

    scene='game';

    mainInterval=setInterval( ()=>{//main loop
        if(delay>0)delay--;

        if(delay<0)delay=0;

        setColor(CONCRETE_COLOR);ctx.fillRect(0,canvas.height-CONCRETE_HEIGHT,canvas.width,CONCRETE_HEIGHT);//draw concrete
        setColor(BACKGROUND_COLOR);ctx.fillRect(0,0,canvas.width,canvas.height-CONCRETE_HEIGHT);//draw wall

        drawSpeedThingies();

        drainManagement();

        pipeManagement();

        drawSkateboard(height,pitch,roll,yaw);

        ctx.fillStyle=OVERLAY_COLOR;
        let textSize=8*canvas.width/CANVAS_WIDTH;
        let textOffset=textSize;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap down to quit',textOffset,textOffset);

        if(roll!=0 && height<SK8_HEIGHT+CONCRETE_HEIGHT*1.5){
                doFiasko();
                setTimeout(initialization,1500);
        }

        if(yaw!=0 && height<SK8_HEIGHT+CONCRETE_HEIGHT*1.5){
                doFiasko();
                setTimeout(initialization,1500);
        }

    },17*slowMoQualifier);
    }
}

ontouchstart=evt=>{
    evt.preventDefault();
    processInteraction(evt)
};

onclick=evt=>{
    evt.preventDefault();
    processInteraction(evt)
};

onkeydown=evt=>{
    evt.preventDefault();
    processInteraction(evt)
};



function processInteraction(evt){//interaction
    if(delay>0)return -1;


    if(scene=='game'){//if we are playing and if we touched in 3rd zone (like math zones but 45 degrees turned clockwise)




        if(determineZone(evt)==3){
            if(jump==0){//if we are not jumping

                    ollie();
            }else if(yaw==0){
                clockwise_shoveit();
            }
        }else if(determineZone(evt)==1){
            if(jump==0){

                    nollie();
            }else if(yaw==0){
                anticlockwise_shoveit();
            }
        }else if(determineZone(evt)==4){
            if(jump!=0 && roll==0){
                if(speed>=0){
                    kickflip();
                }else{
                    heelflip();
                }
            }
        }else if(determineZone(evt)==2){
            if(jump!=0 && roll==0){
                if(speed>=0){
                    heelflip();
                }else{
                    kickflip();
                }
            }
            if(jump==0){
                doFiasko();
                scene='start';
                drawStartScreen();
            }
        }

}else if(scene=='start'){//if this is start of the game
    passOnInteractionToStartScreen(evt);
}else if(scene=='tutorial'){//tutorial
        passOnInteractionToTutorial(evt);
}else if(scene=='titles'){//titles
        passOnInteractionToTitles(evt);
}

}



function determineZone(evt){
if(evt.type=='keydown'){//for keyboard input
    if(evt.keyCode==37)return 3;
    if(evt.keyCode==38)return 4;
    if(evt.keyCode==39)return 1;
    if(evt.keyCode==40)return 2;

    if(evt.keyCode==65)return 3;
    if(evt.keyCode==87)return 4;
    if(evt.keyCode==68)return 1;
    if(evt.keyCode==83)return 2;

    //problem with getting keyboard input
    return -1;
}


let rect = canvas.getBoundingClientRect();//getting x and y coordinates
let root = document.documentElement;//of touch or mouse click
let y= evt.clientY - rect.top - root.scrollTop - canvas.height/2;
let x= evt.clientX - rect.left - root.scrollLeft - canvas.width/2;

if(y<x && y>-x)return 1;
if(y>x && y>-x)return 2;
if(y>x && y<-x)return 3;
if(y<x && y<-x)return 4;

//error handling
return -2;
}

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



function start(){//what is on start of the application
    canvas=document.querySelector('#a');
    whenResized();
    window.addEventListener('resize',whenResized);

    drawStartScreen();
}


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

    ctx.fillText('tap left to see titles',canvas.width/4-textOffset,4*canvas.height/7);
}

function passOnInteractionToTitles(evt){
    if(determineZone(evt)==1){
        scene='start';
        drawStartScreen();
    }
}
function passOnInteractionToTutorial(evt){

    console.log('hi');//FIX ME

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

    let textSize=8*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize*10;
    ctx.font=textSize+'px "Lucida Console", Monaco, monospace';

    ctx.fillText('Your ads could have been there',canvas.width/2-textOffset,canvas.height/2);   //FIX ME


    ctx.fillStyle='#F009';
    textSize=8*canvas.width/CANVAS_WIDTH;
    textOffset=textSize*10;
    ctx.font=textSize+'px Impact, Charcoal, sans-serif';

    ctx.fillText('tap right to go back',canvas.width-textOffset,textOffset);
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

    offset=SK8_OFFSET_FROM_LEFT;

    mainInterval=setInterval( ()=>{
        delay=0;

        setColor(CONCRETE_COLOR);ctx.fillRect(0,canvas.height-CONCRETE_HEIGHT,canvas.width,CONCRETE_HEIGHT);//draw concrete
        setColor(BACKGROUND_COLOR);ctx.fillRect(0,0,canvas.width,canvas.height-CONCRETE_HEIGHT);//draw wall

        drawSkateboard(height,pitch,roll,yaw);

        displayTutorial(currentPage);
    },17*slowMoQualifier);
}

function displayTutorial(page){
    ctx.fillStyle='#F009';
    let textSize=8*canvas.width/CANVAS_WIDTH;
    let textOffset=textSize*4;
    ctx.font=textSize+'px Impact, Charcoal, sans-serif';

    ctx.fillText('tap left to go back',textOffset,textOffset*10/4);

    ctx.fillText('tap up&down to go between pages',textOffset,(7/6)*textOffset*10/4);

    if(page==0){
        if(jump==0){
            ollie();
        }


        ctx.fillStyle='#0A0';
        textSize=8*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap left to do ollie',canvas.width/2-textOffset,canvas.height/2);

    }else if(page==1){
        if(jump==0){
            nollie();
        }


        ctx.fillStyle='#0A0';
        textSize=8*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap right to do nollie',canvas.width/2-textOffset,canvas.height/2);

    }else if(page==2){
        if(jump==0){
            ollie();
            setTimeout(TutorialKickflip(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle='#0A0';
        textSize=8*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap up while in the air to do kickflip',canvas.width/2-textOffset,canvas.height/2);
    }else if(page==3){
        if(jump==0){
            ollie();
            setTimeout(TutorialHeelflip(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle='#0A0';
        textSize=8*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap down while in the air to do heelflip',canvas.width/2-textOffset,canvas.height/2);
    }else if(page==4){
        if(jump==0){
            ollie();
            setTimeout(TutorialBsShoveit(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle='#0A0';
        textSize=8*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap right while in the air to do bs shove-it',canvas.width/2-textOffset,canvas.height/2);
    }else if(page==5){
        if(jump==0){
            ollie();
            setTimeout(TutorialFsShoveit(currentPage),slowMoQualifier*250);
        }


        ctx.fillStyle='#0A0';
        textSize=8*canvas.width/CANVAS_WIDTH;
        textOffset=textSize*10;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap right while in the air to do fs shove-it',canvas.width/2-textOffset,canvas.height/2);
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


function drawTrick(trickSequence){
    console.log(trickSequence);                                                 //FIX ME
}