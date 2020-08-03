function SMSplayNotes(lines,ctx,loop){
    for(let i=0;i<lines.length;i++){
        playLineNotes(lines[i],ctx,0,loop);
    }
}
function playLineNotes(line,audioCtx,index,doWeLoop){
    if(bigData.playing){
        if(index>=line.length){
            if(doWeLoop){
                index=0;
            }else{
                bigData.playing=0;
            }
        }
        if(index<line.length){
            with(audioCtx){
                with(createOscillator()){
                    let g=createGain();
                    connect(g);
                    g.connect(destination);
                    g.gain.value=line[index].vol;
                    frequency.value=line[index].f;
                    type=line[index].type;
                    let t=currentTime;
                    start(t);
                    stop(t+line[index].dur);
                    onended=_=>{playLineNotes(line,audioCtx,index+1,doWeLoop)};
                }
            }
        }
    }
}