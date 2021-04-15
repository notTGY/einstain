let isAudioPlaying = false

isAudioPlaying = true // FIXME

function startAudio() {
  if (isAudioPlaying) return
  isAudioPlaying = true
  p(m,new AudioContext || new window.AudioContext ,1)
}

p=(L,c,l)=>{for(let i=0;L.length>i;i++)o(L[i],c,0,l)};o=(l,c,i,p)=>{if(i>=l.length&&p)i=0;if(l.length>i){with(c){with(createOscillator()){let g=createGain(),t=currentTime;connect(g);g.connect(destination);g.gain.value=l[i][0];frequency.value=l[i][1];type=l[i][2];start(t);stop(t+l[i][3]);onended=_=>{o(l,c,i+1,p)}}}}};
m=[[[0.1,200,"square",0.08],[0,500,"sawtooth",0.185],[0.1,400,"square",0.081],[0,400,"sine",0.162],[0.1,385,"square",0.106],[0,200,"sine",0.1062],[0.1,320,"square",0.1208],[0,200,"sine",0.179]]];
