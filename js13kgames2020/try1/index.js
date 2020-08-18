

start=_=>{
    onresize();
    ctx=canvas.getContext`2d`;
    scene=0;
    mainLoop=setInterval(_=>{
        switch(scene){
            case 0:
                drawStartScreen();
            break;
            case 1:
                playDinosaurGame();
            break;
            default:
        }
    },17)
};

onresize=_=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    let mult=canvas.width/stdWidth;
    fontSize=stdFontSize*mult;
    spriteSize=stdSpriteSize*mult;
};

onkeydown=e=>{
    switch(scene){
        case 0:
            e.key=='l'&&scene++;
        break;
        case 1:
        break;
        default:
    }
}

drawStartScreen=_=>{
    ctx.fillStyle=BACKGROUND_COLOR;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=TEXT_COLOR;
    ctx.font=fontSize+stdFontType;
    ctx.fillText('Find correct button to play game',canvas.width/2-8*fontSize,canvas.height/2-fontSize);
    ctx.fillStyle=FADED_TEXT_COLOR;
    ctx.fillText('You can find hints if you press Ctrl+Shift+I',canvas.width/2-10*fontSize,canvas.height/2+fontSize);
};

playDinosaurGame=_=>{
    hint.innerHTML='Play this game';
    ctx.fillStyle=BACKGROUND_COLOR;
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle=TEXT_COLOR;
    ctx.font=fontSize+stdFontType;
    ctx.fillText('404 Page Not Found',canvas.width/2-7*fontSize,canvas.height/8);
};