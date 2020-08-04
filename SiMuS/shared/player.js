function SMSplay(lines,ctx,loop){
    for(let i=0;i<lines.length;i++){
        playLine(lines[i],ctx,0,loop);
    }
}
function playLine(l,c,i,p){
    if(i>=l.length&&p){
        i=0;
    }
    if(i<l.length){
        with(c){
            with(createOscillator()){
                let g=createGain();
                connect(g);
                g.connect(destination);
                g.gain.value=l[i][0];
                frequency.value=l[i][1];
                type=l[i][2];
                let t=currentTime;
                start(t);
                stop(t+l[i][3]);
                onended=_=>{playLine(l,c,i+1,p)};
            }
        }
    }
}


p=(L,c,l)=>{for(let i=0;i<L.length;i++)o(L[i],c,0,l)};o=(l,c,i,p)=>{if(i>=l.length&&p)i=0;if(i<l.length){with(c){with(createOscillator()){let g=createGain(),t=currentTime;connect(g);g.connect(destination);g.gain.value=l[i][0];frequency.value=l[i][1];type=l[i][2];start(t);stop(t+l[i][3]);onended=_=>{playLine(l,c,i+1,p)}}}}}