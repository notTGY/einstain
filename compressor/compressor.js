function compress(){
        //get input
    let INPUT=document.querySelector("#A").value;
    let OUTPUT=processINPUT(INPUT);//process input
    document.querySelector("#out").innerHTML='';
    document.querySelector("#out").append(OUTPUT);
}
function processINPUT(IN){
    let OUT=IN;
    let useless=[' ','\n','\t']
    for(let i=0;i<useless.length;i++){
        while(OUT.indexOf(useless[i],0)!=-1){
            let tmp1=OUT.substring(0,OUT.indexOf(useless[i],0));
            let tmp2=OUT.substring(OUT.indexOf(useless[i],0)+1);
            OUT=tmp1+tmp2;
        }
    }
    return OUT;
}