function onWindowResize(width,height){
    bigData.secondaryWindow=document.querySelector("#secondaryWindow");
    bigData.secondaryWindow.style.width=width;
    bigData.secondaryWindow.style.height=height*3/4;
    bigData.secondaryWindow.style.top=height/4;
}

function outputToSecondaryWindow(text){
    bigData.secondaryWindow.innerHTML='<pre>'+text+'</pre>';
}
function clearSecondaryWindow(){
    bigData.secondaryWindow.innerHTML='';
}