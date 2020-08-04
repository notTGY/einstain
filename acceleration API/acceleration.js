
let acceleration,orientation,output;

function setup(){
output=document.querySelector('#result');


/*window.addEventListener('deviceorientation',e=>{
    orientation={alpha:e.alpha,beta:e.beta,gamma:e.gamma};
    //updateData();
    console.log(e);
});*/

DeviceMotionEvent.requestPermission()
.then(response => {
  if (response == 'granted') {
    window.addEventListener('devicemotion', (e) => {
        let whatWeNeed=e.accelerationIncludingGravity.z;
        let earthRadius=6371e3;
        let earthMass=5.97237e24;
        let G=6.674e-11;
        let distance=Math.sqrt(1/(whatWeNeed/(G*earthMass)));
        let distanceToSeaLevel=distance-earthRadius;
        output.innerHTML=distanceToSeaLevel+' m';
    })
  }
})
.catch(console.error)


}

function updateData(){
    if(acceleration){
        let whatWeNeed=acceleration.z;
        let earthRadius=6371e3;
        let earthMass=5.97237e24;
        let G=6.674e-11;
        let distance=Math.sqrt(1/(whatWeNeed/(G*earthMass)));
        let distanceToSeaLevel=distance-earthRadius;
        output.innerHTML=distanceToSeaLevel+' m';
    }
    if(orientation){
        output.innerHTML=orientation.beta;
    }
}