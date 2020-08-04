function initButtons(){
    resizeButtons();
}

function checkButtons(evt){

    if(bigData.registeringEvents){

        for(let i=0;i<bigData.frequencyButtons.length;i++){
            let butt=bigData.frequencyButtons[i];
            if(evt.x>butt.x && evt.x<butt.x+butt.w){
                if(evt.y>butt.y && evt.y<butt.y+butt.h){
                    if(bigData.selected!=undefined && bigData.selected.row!=undefined && bigData.selected.num!=undefined){
                        let ammount;
                        if(i==0)ammount=100;
                        if(i==1)ammount=20;
                        if(i==2)ammount=5;
                        if(i==3)ammount=-5;
                        if(i==4)ammount=-20;
                        if(i==5)ammount=-100;
                        bigData.music[bigData.selected.row][bigData.selected.num].f+=ammount;
                    }
                }
            }
        }
        for(let i=0;i<bigData.volumeButtons.length;i++){
            let butt=bigData.volumeButtons[i];
            if(evt.x>butt.x && evt.x<butt.x+butt.w){
                if(evt.y>butt.y && evt.y<butt.y+butt.h){
                    if(bigData.selected!=undefined && bigData.selected.row!=undefined && bigData.selected.num!=undefined){
                        let ammount;
                        if(i==0)ammount=.2;
                        if(i==1)ammount=.05;
                        if(i==2)ammount=.01;
                        if(i==3)ammount=-.01;
                        if(i==4)ammount=-.05;
                        if(i==5)ammount=-.2;
                        bigData.music[bigData.selected.row][bigData.selected.num].vol+=ammount;
                        if(bigData.music[bigData.selected.row][bigData.selected.num].vol>1){
                            bigData.music[bigData.selected.row][bigData.selected.num].vol=1;
                        }
                        if(bigData.music[bigData.selected.row][bigData.selected.num].vol<0){
                            bigData.music[bigData.selected.row][bigData.selected.num].vol=0;
                        }
                    }
                }
            }
        }

    }

    let butt=bigData.exportButton;
    if(evt.x>butt.x && evt.x<butt.x+butt.w){
        if(evt.y>butt.y && evt.y<butt.y+butt.h){
            exportButtonDoes();
        }
    }

    butt=bigData.importButton;
    if(evt.x>butt.x && evt.x<butt.x+butt.w){
        if(evt.y>butt.y && evt.y<butt.y+butt.h){
            importButtonDoes();
        }
    }

    butt=bigData.helpButton;
    if(evt.x>butt.x && evt.x<butt.x+butt.w){
        if(evt.y>butt.y && evt.y<butt.y+butt.h){
            helpButtonDoes();
        }
    }
}

function drawButtons(){
    let qualifierW=bigData.mainCanvas.width/640;
    let qualifier=bigData.mainCanvas.height/480;
    bigData.mainCtx.strokeStyle='#000';
    bigData.mainCtx.lineWidth=qualifierW*.5;
    bigData.mainCtx.font=Math.ceil(bigData.fontSize)*3/4+'px Impact, Charcoal, sans-serif';
    for(let i=0;i<bigData.frequencyButtons.length;i++){
        let x=bigData.frequencyButtons[i].x;
        let y=bigData.frequencyButtons[i].y;
        let w=bigData.frequencyButtons[i].w;
        let h=bigData.frequencyButtons[i].h;
        let text=bigData.frequencyButtons[i].text;
        bigData.mainCtx.fillStyle='#811';
        bigData.mainCtx.fillRect(x,y,w,h);
        bigData.mainCtx.strokeRect(x,y,w,h);
        bigData.mainCtx.fillStyle='#000';
        bigData.mainCtx.fillText(text,x+4*qualifierW,y+h-qualifier);
    }
    for(let i=0;i<bigData.volumeButtons.length;i++){
        let x=bigData.volumeButtons[i].x;
        let y=bigData.volumeButtons[i].y;
        let w=bigData.volumeButtons[i].w;
        let h=bigData.volumeButtons[i].h;
        let text=bigData.volumeButtons[i].text;
        bigData.mainCtx.fillStyle='#2AF';
        bigData.mainCtx.fillRect(x,y,w,h);
        bigData.mainCtx.strokeRect(x,y,w,h);
        bigData.mainCtx.fillStyle='#000';
        bigData.mainCtx.fillText(text,x+4*qualifierW,y+h-qualifier);
    }
    bigData.mainCtx.font=Math.ceil(bigData.fontSize)+'px Impact, Charcoal, sans-serif';

    let x=bigData.exportButton.x;
    let y=bigData.exportButton.y;
    let w=bigData.exportButton.w;
    let h=bigData.exportButton.h;
    let text=bigData.exportButton.text;
    bigData.mainCtx.fillStyle='#FFF';
    bigData.mainCtx.fillRect(x,y,w,h);
    bigData.mainCtx.strokeRect(x,y,w,h);
    bigData.mainCtx.fillStyle='#001';
    bigData.mainCtx.fillText(text,x+8*qualifierW,y+h-6*qualifier);

    x=bigData.importButton.x;
    y=bigData.importButton.y;
    w=bigData.importButton.w;
    h=bigData.importButton.h;
    text=bigData.importButton.text;
    bigData.mainCtx.fillStyle='#FFF';
    bigData.mainCtx.fillRect(x,y,w,h);
    bigData.mainCtx.strokeRect(x,y,w,h);
    bigData.mainCtx.fillStyle='#001';
    bigData.mainCtx.fillText(text,x+8*qualifierW,y+h-6*qualifier);

    x=bigData.helpButton.x;
    y=bigData.helpButton.y;
    w=bigData.helpButton.w;
    h=bigData.helpButton.h;
    text=bigData.helpButton.text;
    bigData.mainCtx.fillStyle='#FFF';
    bigData.mainCtx.fillRect(x,y,w,h);
    bigData.mainCtx.strokeRect(x,y,w,h);
    bigData.mainCtx.fillStyle='#001';
    bigData.mainCtx.fillText(text,x+15*qualifierW,y+h-6*qualifier);
}

function resizeButtons(width,height){
    let qualifierW=width/640;
    let qualifier=height/480;
    bigData.frequencyButtons=[];
    bigData.volumeButtons=[];
    bigData.frequencyButtons[0]={x:170*qualifierW,y:5*qualifier,w:20*qualifierW,h:10*qualifier,text:'+100'};
    bigData.frequencyButtons[1]={x:170*qualifierW,y:25*qualifier,w:20*qualifierW,h:10*qualifier,text:'+20'};
    bigData.frequencyButtons[2]={x:170*qualifierW,y:45*qualifier,w:20*qualifierW,h:10*qualifier,text:'+5'};
    bigData.frequencyButtons[3]={x:170*qualifierW,y:65*qualifier,w:20*qualifierW,h:10*qualifier,text:'-5'};
    bigData.frequencyButtons[4]={x:170*qualifierW,y:85*qualifier,w:20*qualifierW,h:10*qualifier,text:'-20'};
    bigData.frequencyButtons[5]={x:170*qualifierW,y:105*qualifier,w:20*qualifierW,h:10*qualifier,text:'-100'};

    bigData.volumeButtons[0]={x:200*qualifierW,y:5*qualifier,w:20*qualifierW,h:10*qualifier,text:'+0.2'};
    bigData.volumeButtons[1]={x:200*qualifierW,y:25*qualifier,w:20*qualifierW,h:10*qualifier,text:'+0.05'};
    bigData.volumeButtons[2]={x:200*qualifierW,y:45*qualifier,w:20*qualifierW,h:10*qualifier,text:'+0.01'};
    bigData.volumeButtons[3]={x:200*qualifierW,y:65*qualifier,w:20*qualifierW,h:10*qualifier,text:'-0.01'};
    bigData.volumeButtons[4]={x:200*qualifierW,y:85*qualifier,w:20*qualifierW,h:10*qualifier,text:'-0.05'};
    bigData.volumeButtons[5]={x:200*qualifierW,y:105*qualifier,w:20*qualifierW,h:10*qualifier,text:'-0.2'};

    bigData.exportButton={x:580*qualifierW,y:5*qualifier,w:40*qualifierW,h:20*qualifier,text:'js export'};
    bigData.importButton={x:580*qualifierW,y:50*qualifier,w:40*qualifierW,h:20*qualifier,text:'js import'};
    bigData.helpButton={x:580*qualifierW,y:95*qualifier,w:40*qualifierW,h:20*qualifier,text:'help'};
}



function exportButtonDoes(){
    bigData.registeringEvents=0;
    if(bigData.stage==''){
        bigData.stage='export';
        drawExportPage();
    }else{
        if(bigData.stage=='export'){
            clearSecondaryWindow();
            bigData.stage='';
            bigData.registeringEvents=1;
        }
    }
}

function importButtonDoes(){
    bigData.registeringEvents=0;
    if(bigData.stage==''){
        bigData.stage='import';
        drawImportPage();
    }else{
        if(bigData.stage=='import'){
            clearSecondaryWindow();
            bigData.stage='';
            bigData.registeringEvents=1;
        }
    }
}

function helpButtonDoes(){
    bigData.registeringEvents=0;
    if(bigData.stage==''){
        bigData.stage='help';
        drawHelpWindow();
    }else{
        if(bigData.stage=='help'){
            clearSecondaryWindow();
            bigData.stage='';
            bigData.registeringEvents=1;
        }
    }
}