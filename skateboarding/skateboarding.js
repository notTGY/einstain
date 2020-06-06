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
let SHADE_RADIUS;

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
let shades;


let speedPiece;
let drain;
let quaterPipe;
let backQuaterPipe;

let scene='start';

let canRenderTricks=false;



function start(){//what is on start of the application
    canvas=document.querySelector('#a');
    whenResized();
    window.addEventListener('resize',whenResized);

    drawStartScreen();
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
    shades=0;

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

        shadeManagement();

        pipeManagement();

        drawSkateboard(height,pitch,roll,yaw,shades);

        drawSpeedThingies();

        drainManagement();

        renderDoneTricks();

        ctx.fillStyle=OVERLAY_COLOR;
        let textSize=14*canvas.width/CANVAS_WIDTH;
        let textOffset=textSize;
        ctx.font=textSize+'px Impact, Charcoal, sans-serif';

        ctx.fillText('tap down to quit',textOffset,textOffset);

        if(roll!=0 && height<SK8_HEIGHT+CONCRETE_HEIGHT*1.5){
                doFiasko();
                setTimeout(initialization,TIME_AFTER_HIT);
        }

        if(yaw!=0 && height<SK8_HEIGHT+CONCRETE_HEIGHT*1.5){
                doFiasko();
                setTimeout(initialization,TIME_AFTER_HIT);
        }

    },17*slowMoQualifier);
    }
}


function doFiasko(){//doing job of taking out the rubbish
    clearInterval(mainInterval);
    clearInterval(jumpInterval);
    clearInterval(flipInterval);
    clearInterval(shoveInterval);
    isFiasko=true;

    delay=0;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    speed=STARTING_SPEED;
    jump=0;
    yaw=0;
    roll=0;
    shades=0;

    offset=SK8_OFFSET_FROM_LEFT;

    speedPiece=[...SPEEDTHINGIES];
    drain=[...DRAINS];
    quaterPipe=QUATERPIPE;
    backQuaterPipe=BACKQUATERPIPE;
}




