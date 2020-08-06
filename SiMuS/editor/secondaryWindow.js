function onWindowResize(width,height){
    bigData.secondaryWindow=document.querySelector("#secondaryWindow");
    if(bigData.switchedToSecondaryWindow){
        bigData.secondaryWindow.style.width=Math.floor(width)+'px';
        bigData.secondaryWindow.style.height=Math.floor(height*3/4)+'px';
        bigData.secondaryWindow.style.top=Math.floor(height/4)+'px';
    }else{
        bigData.secondaryWindow.style.width='0px';
        bigData.secondaryWindow.style.height='0px';
        bigData.secondaryWindow.style.top='0px';
    }
}

function outputToSecondaryWindow(text){
    bigData.secondaryWindow.innerHTML=text;
    bigData.switchedToSecondaryWindow=1;
    onWindowResize(bigData.mainCanvas.width,bigData.mainCanvas.height);
    if(bigData.stage=='import'){
        doTheFollowing();
    }
}
function clearSecondaryWindow(){
    bigData.secondaryWindow.innerHTML='';
    bigData.switchedToSecondaryWindow=0;
    onWindowResize(bigData.mainCanvas.width,bigData.mainCanvas.height);
    drawEverything();
}

function drawExportPage(){
    let text='';
    text+='<h4 style="text-align:center">Copy following code. To play music execute p(m,new AudioContext,0);</h4><br>';
    text+="p=(L,c,l)=>{for(let i=0;L.length>i;i++)o(L[i],c,0,l)};o=(l,c,i,p)=>{if(i>=l.length&&p)i=0;if(l.length>i){with(c){with(createOscillator()){let g=createGain(),t=currentTime;connect(g);g.connect(destination);g.gain.value=l[i][0];frequency.value=l[i][1];type=l[i][2];start(t);stop(t+l[i][3]);onended=_=>{o(l,c,i+1,p)}}}}};";
    text+='<br>m=[';
    let musicConverted=[[]];
    musicConverted=convertNotes(copy(bigData.music));
    for(let i=0;i<musicConverted.length;i++){
        let bigArr=musicConverted[i];
        text+='[';
        for(let n=0;n<bigArr.length;n++){
            let lilArr=bigArr[n];
            text+='[';
            for(let j=0;j<lilArr.length;j++){
                if(typeof(lilArr[j])=="string"){
                    text+='\"';
                }
                text+=''+lilArr[j];
                if(typeof(lilArr[j])=="string"){
                    text+='\"';
                }
                if(j<lilArr.length-1)text+=',';
            }
            text+=']';
            if(n<bigArr.length-1)text+=',';
        }
        text+=']';
        if(i<musicConverted.length-1)text+=',';
    }
    text+='];'
    outputToSecondaryWindow(text);
}

function drawImportPage(){
    let text='<h4 style="text-align:center">Insert your js code (only part after "m=..." matters)</h4><br>';
    text+='<input id="just_input">insert here</input>';
    outputToSecondaryWindow(text);
}

function doTheFollowing(){
    let inputField=document.querySelector('#just_input');
    inputField.onchange=_=>{
        let inputField=document.querySelector('#just_input');
        let value=inputField.value;
        value=value.substring(value.indexOf('[[['),value.indexOf(']]]')-value.indexOf('[[[')+5);
        value=JSON.parse(value);
        console.log(value);
        bigData.music=convertToNotes(copy(value));
    };
}

function drawHelpWindow(){
    let text='<h4 style="text-align:center">I am too stupid to help any1</h4><br>';
    text+='your ads could have been here.';
    outputToSecondaryWindow(text);
}