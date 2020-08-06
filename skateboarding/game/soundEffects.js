let playMusic=(L,c,l)=>{for(let i=0;L.length>i;i++)playLine(L[i],c,0,l)};
let playLine=(l,c,i,p)=>{if(i>=l.length&&p)i=0;if(l.length>i){with(c){with(createOscillator()){let g=createGain(),t=currentTime;connect(g);g.connect(destination);g.gain.value=l[i][0];frequency.value=l[i][1];type=l[i][2];start(t);stop(t+l[i][3]);onended=_=>{playLine(l,c,i+1,p)}}}}};


function snapSound(){
    let music=[[]];
    let m=[[[0.06,20,"sawtooth",0.0583]]];

}

function landingSound(){
    let music=[[]];
}

function swooshSound(){
    let music=[[]];
}

function startBackgroundMusic(){
    let music=[[]];
}