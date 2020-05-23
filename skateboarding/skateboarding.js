let CANVAS_WIDTH=300;
let CANVAS_HEIGHT=300;
let ctx,canvas;

let mainInterval;


let isFiasko=false;

let delay=0;

let slowMoQualifier=1;

const SK8_OFFSET_FROM_LEFT=40;
const SK8_WIDTH=160;
const SK8_FROM_CENTER_TO_WHEEL=50;
const SK8_HEIGHT=25;
const SK8_THICK=5;
let offset;

const CONCRETE_HEIGHT=20;

const DRAIN_WIDTH=90;

const QUATERPIPE_SIZE=120;

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


function drawCircle(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI,1);ctx.fill()}

function setColor(color){ctx.fillStyle=color}





function doFiasko(){clearInterval(mainInterval);isFiasko=true;setTimeout(initialization,1500)}



function drainManagement(){//draw and move drains
    setColor`#111`;
    for(j=0;j<drain.length;j++){
        drain[j]-=speed;

        if(drain[j]-DRAIN_WIDTH/2<canvas.width && drain[j]>-DRAIN_WIDTH/2){

            ctx.fillRect(drain[j]-DRAIN_WIDTH/2,canvas.height-CONCRETE_HEIGHT,DRAIN_WIDTH,18);

            if( (drain[j]<(offset+SK8_WIDTH/2+SK8_FROM_CENTER_TO_WHEEL+DRAIN_WIDTH/2)) && (drain[j]>(offset+SK8_WIDTH/2-SK8_FROM_CENTER_TO_WHEEL-DRAIN_WIDTH/2)) && jump==0 ){
                doFiasko();
            }
        }
    }
}





function drawSpeedThingies(){     //draw grey rects that create illusion of speed
    setColor`#666`;
    for(j=0;j<speedPiece.length;j++){
        if(speedPiece[j]<-30 && speed>=0)speedPiece[j]=canvas.width+30;
        if(speedPiece[j]>canvas.width+30 && speed<0)speedPiece[j]=-30;

        if(speed>=0)speedPiece[j]-=speed;
        if(speed<0)speedPiece[j]+=Math.abs(speed);

        ctx.fillRect(speedPiece[j],canvas.height-CONCRETE_HEIGHT/2,30,4)
    }
}


function pipeManagement(){//FIX ME
    backQuaterPipe+=speed;//moving pipes
    quaterPipe+=speed;

    if(quaterPipe-QUATERPIPE_SIZE<=canvas.width){//drawing pipes
        ;
    }
    if(backQuaterPipe+QUATERPIPE_SIZE>=0){
        ;
    }
    //detecting collisions with pipes
    if(jump!=0 && speed>=0 && quaterPipe-QUATERPIPE_SIZE<=SK8_OFFSET_FROM_LEFT+SK8_WIDTH)doFiasko();
    if(jump!=0 && speed<0 && backQuaterPipe+QUATERPIPE_SIZE<=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH)doFiasko();
}

function drawQuater(x,y){

}



function drawSkateboard(h,a,r,y){


    let width=SK8_WIDTH*Math.cos(y); //what changes when you turn yaw
    let to_wheel=SK8_FROM_CENTER_TO_WHEEL*Math.cos(y);
    let thick=SK8_THICK;
    let r1=10*(1+Math.sin(y)*0.3);
    let lilr1=3*(1+Math.sin(y)*0.3);
    let r2=10*(1-Math.sin(y)*0.3);
    let lilr2=3*(1-Math.sin(y)*0.3);//yaw ends here

    r1=r1*(.1+Math.abs(Math.cos(r)));//roll to wheels
    r2=r2*(.1+Math.abs(Math.cos(r)));
    lilr1=lilr1*(.1+Math.abs(Math.cos(r)));
    lilr2=lilr2*(.1+Math.abs(Math.cos(r)));


    let smallerThick=thick*0.7+thick*Math.abs(Math.sin(r)*0.9);
    thick=thick*0.5+thick/(1.1-Math.abs(Math.sin(r)));//roll body

    offset=SK8_OFFSET_FROM_LEFT;
    if(speed<0){offset=canvas.width-offset-SK8_WIDTH;}


    ctx.translate(offset+SK8_WIDTH/2,canvas.height-h);//drawing skateboard
    ctx.rotate(a);


    if(r<Math.PI){
        let wheelHeight=smallerThick*Math.cos(r);

        setColor`#FFF`;drawCircle(-to_wheel,wheelHeight+r1,r1);//drawing wheels first
        setColor`#CCC`;drawCircle(-to_wheel,wheelHeight+r1,lilr1);

        setColor`#FFF`;drawCircle(to_wheel,wheelHeight+r2,r2);
        setColor`#CCC`;drawCircle(to_wheel,wheelHeight+r2,lilr2);

        setColor`#642`;ctx.fillRect(-width/2,0,width,smallerThick);//draw brown thing first
        setColor`#000`;ctx.fillRect(-width/2,-thick,width,thick);
    }else{
        let wheelHeight=thick*Math.cos(r);

        setColor`#000`;ctx.fillRect(-width/2,0,width,smallerThick);//draw black thing first
        setColor`#642`;ctx.fillRect(-width/2,-thick,width,thick);

        setColor`#FFF`;drawCircle(-to_wheel,-(r1+wheelHeight),r1);//drawing wheels after everything else
        setColor`#CCC`;drawCircle(-to_wheel,-(r1+wheelHeight),lilr1);

        setColor`#FFF`;drawCircle(to_wheel,-(r2+wheelHeight),r2);
        setColor`#CCC`;drawCircle(to_wheel,-(r2+wheelHeight),lilr2);
    }

    ctx.rotate(-a);
    ctx.translate(-(offset+SK8_WIDTH/2),h-canvas.height);
}




function start(){//what is on start of the application
    canvas=document.querySelector('#a');
    canvas.height=CANVAS_HEIGHT;
    canvas.width=CANVAS_WIDTH;

    ctx=canvas.getContext`2d`;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    roll=0;
    yaw=0;

    setColor`#999`;ctx.fillRect(0,canvas.height-CONCRETE_HEIGHT,canvas.width,CONCRETE_HEIGHT);//draw concrete
    setColor`#333`;ctx.fillRect(0,0,canvas.width,canvas.height-CONCRETE_HEIGHT);//draw wall

    drawSkateboard(height,pitch,roll,yaw);


}


function initialization(){//every game start (when you die)
    canvas=document.querySelector('#a');
    canvas.height=CANVAS_HEIGHT;
    canvas.width=CANVAS_WIDTH;

    isFiasko=false;

    delay=0;

    ctx=canvas.getContext`2d`;

    height=SK8_HEIGHT+CONCRETE_HEIGHT;
    pitch=0;
    speed=5;
    jump=0;
    yaw=0;
    roll=0;

    speedPiece=[10,150,290];
    drain=[1000,3000];
    quaterPipe=10000;
    backQuaterPipe=-2000;

    scene='game';

    mainInterval=setInterval( ()=>{//main loop
        if(delay>0)delay--;

        if(delay<0)delay=0;

        setColor`#999`;ctx.fillRect(0,canvas.height-CONCRETE_HEIGHT,canvas.width,CONCRETE_HEIGHT);//draw concrete
        setColor`#333`;ctx.fillRect(0,0,canvas.width,canvas.height-CONCRETE_HEIGHT);//draw wall

        drawSpeedThingies();

        drainManagement();

        pipeManagement();

        drawSkateboard(height,pitch,roll,yaw);

        if(roll!=0 && height<SK8_HEIGHT+CONCRETE_HEIGHT*1.5){
                doFiasko();
        }

        if(yaw!=0 && height<SK8_HEIGHT+CONCRETE_HEIGHT*1.5){
                doFiasko();
        }

    },17*slowMoQualifier);
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
    //evt.preventDefault();       FIX ME
    processInteraction(evt)
};

function processInteraction(evt){//interaction
    if(delay>0)return -1;


    if(scene=='game'){//if we are playing and if we touched in 3rd zone (like math zones but 45 degrees turned clockwise)
        if(determineZone(evt)==3){
            if(jump==0){//if we are not jumping
                if(speed>=0){
                    ollie();
                }else{
                    nollie();
                }
            }else if(yaw==0){
                clockwise_shoveit();
            }
        }else if(determineZone(evt)==1){
            if(jump==0){
                if(speed>=0){
                    nollie();
                }else{
                    ollie();
                }
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
        }

}else if(scene=='start'){//if this is start of the game
    scene='game';initialization();//we want just start game after any event
    }

}



function determineZone(evt){
if(evt.type=='keydown'){//for keyboard input
    if(evt.keyCode==37)return 3;
    if(evt.keyCode==38)return 2;
    if(evt.keyCode==39)return 1;
    if(evt.keyCode==40)return 4;

    if(evt.keyCode==65)return 3;
    if(evt.keyCode==87)return 2;
    if(evt.keyCode==68)return 1;
    if(evt.keyCode==83)return 4;

    //problem with getting keyboard input
    return -1;
}


let rect = canvas.getBoundingClientRect();//getting x and y coordinates
let root = document.documentElement;//of touch or mouse click
let y= evt.clientY - rect.top - root.scrollTop - canvas.height/2;
let x= evt.clientX - rect.left - root.scrollLeft - canvas.width/2;

if(y<x && y>-x)return 1;
if(y<x && y<-x)return 2;
if(y>x && y<-x)return 3;
if(y>x && y>-x)return 4;

//error handling
return -2;
}

function ollie(){
    delay=8;
jumpInterval=setInterval( ()=>{//perform jump
    jump++;
    if(jump<=80){
        height+=1.5;pitch-=.01
    }

    if(jump>80 && jump<=120){
        height+=1;pitch+=.02
    }

    if(jump>120){
        height-=4
    }

    if(jump==160 || isFiasko){
        clearInterval(jumpInterval);jump=0
    }
},5*slowMoQualifier);
}

function nollie(){
    delay=8;
jumpInterval=setInterval( ()=>{//perform jump
    jump++;
    if(jump<=80){
        height+=1.5;pitch+=.01
    }

    if(jump>80 && jump<=120){
        height+=1;pitch-=.02
    }

    if(jump>120){
        height-=4
    }

    if(jump==160 || isFiasko){
        clearInterval(jumpInterval);jump=0
    }
},5*slowMoQualifier);
}


function kickflip(){
    delay=8;
console.log('kickflip');
flipInterval=setInterval( ()=>{//perform flip
    roll+=Math.PI/10;
    if(roll>=2*Math.PI || isFiasko){
            clearInterval(flipInterval);
            console.log('kickflip done!');
            roll=0;
        }
},8*slowMoQualifier);
}

function heelflip(){
    delay=8;
console.log('heelflip');
roll=2*Math.PI;
flipInterval=setInterval( ()=>{//perform flip
    roll-=Math.PI/10;
    if(roll<=0 || isFiasko){
            clearInterval(flipInterval);
            console.log('heelflip done!');
            roll=0;
        }
},8*slowMoQualifier);
}

function clockwise_shoveit(){
    delay=8;
console.log('clockwise shoveit');
shoveInterval=setInterval( ()=>{//perform thing
    yaw+=Math.PI/10;
    if(yaw>=Math.PI || isFiasko){
            clearInterval(shoveInterval);
            console.log('clockwise shoveit done!');
            yaw=0;
        }
},17*slowMoQualifier);
}

function anticlockwise_shoveit(){
    delay=8;
console.log('anticlockwise shoveit');
shoveInterval=setInterval( ()=>{//perform thing
    yaw-=Math.PI/10;
    if(yaw<=-Math.PI || isFiasko){
            clearInterval(shoveInterval);
            console.log('anticlockwise shoveit done!');
            yaw=0;
        }
},17*slowMoQualifier);
}