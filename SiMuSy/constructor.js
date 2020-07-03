let music;

function Note(vol,f,type,dur){
    this.vol=vol;
    this.f=f;
    this.type=type;
    this.dur=dur;
}

function convertNotes(lines){
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        for(let j=0;j<line.length;j++){
            n=line[j];
            line[j]=[n.vol,n.f,n.type,n.dur];
        }
    }
    return lines;
}


function smth(){
    let actx=new(window.audioContext||window.AudioContext||window.webkitAudioContext);
    music=[[]];

    note1=new Note(1,200,'sine',.5);
    note2=new Note(.3,400,'sine',.5);

    music[0]=[note1,note2];

    music=convertNotes(music);
    console.log({music});
    SMSplay(music,actx,0);
}