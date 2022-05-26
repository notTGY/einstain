with(new AudioContext)[2,5,7,9,10,11,11,11,11,12,12,12,13].map((v,i)=>{with(createOscillator())start(e=[21,19,18,17,16,8,9,10,15,11,12,14,13][i]/5,connect(destination),frequency.setValueAtTime(440*1.06**(12-v),0)),stop(e+.2)})

