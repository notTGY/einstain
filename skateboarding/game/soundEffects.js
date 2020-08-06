let playMusic=(L,c,l)=>{for(let i=0;L.length>i;i++)playLine(L[i],c,0,l)};
let playLine=(l,c,i,p)=>{if(i>=l.length&&p)i=0;if(l.length>i){with(c){with(createOscillator()){let g=createGain(),t=currentTime;connect(g);g.connect(destination);g.gain.value=l[i][0];frequency.value=l[i][1];type=l[i][2];start(t);stop(t+l[i][3]);onended=_=>{playLine(l,c,i+1,p)}}}}};


function snapSound(){
    let music=[[]];
    music=[[[0.06,20,"sawtooth",0.0583]]];
    playMusic(music,audioCtx,0);
}

function landingSound(){
    let music=[[[0.01,70,"sine",0.09],[0,200,"sine",0.186],[0.01,70,"sine",0.0983]]];
    playMusic(music,audioCtx,0);
}

function swooshSound(){
    let music=[[]];
}

function startBackgroundMusic(){
    let music=[[]];
}