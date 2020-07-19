IN.onchange=e=>{
    data=[[]];

let f=e.target.files[0];
if(!f)return;
with(new FileReader){
onload=x=>{
    for(let i=0,t=x.target.result.split('\n');i<t.length;i++)data[i]=t[i].split(',');
    console.log(data)};readAsText(f)}};



