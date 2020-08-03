function drawUpperMenu(){
    bigData.mainCtx.fillStyle='#666';
    bigData.mainCtx.fillRect(0,0,bigData.mainCanvas.width,bigData.mainCanvas.height/4);
    displaySelectedNote();
    displayPlayButton();
    displayFrequencyChangingButtons();
    displayVolumeChangingButtons();
    displayExportButton();
    displayImportButton();
    displayHelpButton();
}




function displaySelectedNote(){
    if(bigData.selected!=undefined && bigData.selected.row!=undefined && bigData.selected.num!=undefined){
        let qualifier=bigData.mainCanvas.width/640;
        let w=100*qualifier;
        let x=60*qualifier;
        let y=5*qualifier;
        let h=bigData.mainCanvas.height/4-2*y;
        let i=bigData.selected.row;
        let j=bigData.selected.num;
        drawNote(bigData.music[i][j],x,y,w,h,0,0);
    }
}



function displayPlayButton(){
    let qualifier=bigData.mainCanvas.width/640;
    let w=50*qualifier;
    let x=y=10*qualifier;
    let h=bigData.mainCanvas.height/4;
    let width=myMin((w-20*qualifier)/2,h/2);
    bigData.mainCtx.fillStyle='#009';
    if(bigData.playing==0){
        drawPlayTriangle(w/2,h/2,width);
    }else{
        drawPause(w/2,h/2,width);
    }
}

function displayVolumeChangingButtons(){
    //+0.1 +0.05 +0.01 -0.01 -0.05 -0.1
}

function displayFrequencyChangingButtons(){
    //+100 +20 +5 -5 -20 -100
}

function displayExportButton(){

}

function displayImportButton(){

}

function displayHelpButton(){
    
}