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
    SHADE_RADIUS=constants.SHADE_RADIUS*tmp2;
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