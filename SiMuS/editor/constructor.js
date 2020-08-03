function Note(vol,f,type,dur){
    this.vol=vol;
    this.f=f;
    this.type=type;
    this.dur=dur;
    this.c=function(){
        return {vol:this.vol,f:this.f,type:this.type,dur:this.dur};
    }
}


function generateSampleAndPlayIt(){
    let actx=new(window.audioContext||window.AudioContext||window.webkitAudioContext);
    let music=[[]];

    note1=new Note(1,200,'sine',.5);
    note2=new Note(.3,400,'sine',.5);

    music[0]=[note1.c(),note2.c()];

    music=convertNotes(music);
    console.log({music});
    SMSplay(music,actx,0);
}