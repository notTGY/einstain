function drawCircle(x,y,r){ctx.beginPath();ctx.arc(x,y,r,0,2*Math.PI,1);ctx.fill()}

function drawShade(x,y,r,angle){ctx.beginPath();ctx.arc(x,y,r,angle,angle+Math.PI/2,0);ctx.fill();
    ctx.beginPath();ctx.arc(x,y,r,angle+Math.PI,angle+3*Math.PI/2,0);ctx.fill()}

function setColor(color){ctx.fillStyle=color}

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



function drawSkateboard(h,a,r,y,shade_angle){


    let width=SK8_WIDTH*Math.cos(y); //what changes when you turn yaw
    let to_wheel=SK8_FROM_CENTER_TO_WHEEL*Math.cos(y);
    let thick=SK8_THICK;
    let r1=WHEEL_RADIUS*(1+Math.sin(y)*0.3);
    let lilr1=BOLTS_RADIUS*(1+Math.sin(y)*0.3);
    let shader1=SHADE_RADIUS*(1+Math.sin(y)*0.3);
    let r2=WHEEL_RADIUS*(1-Math.sin(y)*0.3);
    let lilr2=BOLTS_RADIUS*(1-Math.sin(y)*0.3);
    let shader2=SHADE_RADIUS*(1-Math.sin(y)*0.3);//yaw ends here

    r1=r1*(.1+Math.abs(Math.cos(r)));//roll to wheels
    r2=r2*(.1+Math.abs(Math.cos(r)));
    lilr1=lilr1*(.1+Math.abs(Math.cos(r)));
    lilr2=lilr2*(.1+Math.abs(Math.cos(r)));
    shader1=shader1*(.1+Math.abs(Math.cos(r)));
    shader2=shader2*(.1+Math.abs(Math.cos(r)));

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
        setColor(SHADE_COLOR);drawShade(-to_wheel,r1+wheelHeight,shader1,shade_angle);

        setColor(WHEEL_COLOR);drawCircle(to_wheel,wheelHeight+r2,r2);
        setColor(BOLTS_COLOR);drawCircle(to_wheel,wheelHeight+r2,lilr2);
        setColor(SHADE_COLOR);drawShade(to_wheel,r2+wheelHeight,shader2,shade_angle);

        setColor(DECK_COLOR);ctx.fillRect(-width/2,0,width,smallerThick);//draw brown thing first
        setColor(GRIPTAPE_COLOR);ctx.fillRect(-width/2,-thick,width,thick);
    }else{
        let wheelHeight=thick*Math.cos(r);

        setColor(GRIPTAPE_COLOR);ctx.fillRect(-width/2,0,width,smallerThick);//draw black thing first
        setColor(DECK_COLOR);ctx.fillRect(-width/2,-thick,width,thick);

        setColor(WHEEL_COLOR);drawCircle(-to_wheel,-(r1+wheelHeight),r1);//drawing wheels after everything else
        setColor(BOLTS_COLOR);drawCircle(-to_wheel,-(r1+wheelHeight),lilr1);
        setColor(SHADE_COLOR);drawShade(-to_wheel,-(r1+wheelHeight),shader1,shade_angle);

        setColor(WHEEL_COLOR);drawCircle(to_wheel,-(r2+wheelHeight),r2);
        setColor(BOLTS_COLOR);drawCircle(to_wheel,-(r2+wheelHeight),lilr2);
        setColor(SHADE_COLOR);drawShade(to_wheel,-(r2+wheelHeight),shader2,shade_angle);
    }

    ctx.rotate(-a);
    ctx.translate(-(offset+SK8_WIDTH/2),h-canvas.height);
}