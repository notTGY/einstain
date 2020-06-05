ontouchstart=evt=>{
    evt.preventDefault();
    evt=evt.changedTouches[0];
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