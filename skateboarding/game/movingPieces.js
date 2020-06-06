function drainManagement(){//draw and move drains
    setColor(DRAIN_COLOR);
    for(j=0;j<drain.length;j++){
        drain[j]-=speed/10;

        if(drain[j]-DRAIN_WIDTH/2<canvas.width && drain[j]>-DRAIN_WIDTH/2){

            ctx.fillRect(drain[j]-DRAIN_WIDTH/2,canvas.height-CONCRETE_HEIGHT,DRAIN_WIDTH,DRAIN_HEIGHT);

            if( (drain[j]<(offset+SK8_WIDTH/2+SK8_FROM_CENTER_TO_WHEEL+DRAIN_WIDTH/2)) && (drain[j]>(offset+SK8_WIDTH/2-SK8_FROM_CENTER_TO_WHEEL-DRAIN_WIDTH/2)) && jump==0 ){
                doFiasko();
                setTimeout(initialization,TIME_AFTER_HIT);
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
        setTimeout(initialization,TIME_AFTER_HIT);
    }
    if(jump!=0 && speed<0 && backQuaterPipe+QUATERPIPE_SIZE>=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH && backQuaterPipe+QUATERPIPE_SIZE>=canvas.width-SK8_OFFSET_FROM_LEFT-SK8_WIDTH +QUATERPIPE_SIZE){
        doFiasko();
        setTimeout(initialization,TIME_AFTER_HIT);
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



function shadeManagement(){
    shades+=(speed/SHADE_RADIUS)/(10*Math.PI);
    if(shades>=2*Math.PI)shades-=2*Math.PI;
}
