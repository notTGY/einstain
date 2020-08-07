function KV(key,value){
    this.key=key;
    this.value=value;
}

function dictLookup(key,dict){
    for(let i=0;i<dict.length;i++){
        if(dict[i].key==key)return i;
    }
    return -1;
}

function fillForbidden(){
    let dict=[];
    dict[0]={key:' '};
    dict[1]={key:'\t'};
    dict[2]={key:'\n'};
    dict[3]={key:'\\'};
    dict[4]={key:'\''};
    dict[5]={key:'\"'};
    dict[6]={key:'!'};
    dict[7]={key:'.'};
    dict[8]={key:','};
    dict[9]={key:'-'};
    dict[10]={key:';'};
    dict[11]={key:':'};
    dict[12]={key:'='};
    dict[13]={key:'+'};
    dict[14]={key:')'};
    dict[15]={key:'('};
    dict[16]={key:']'};
    dict[17]={key:'['};
    dict[18]={key:'}'};
    dict[19]={key:'{'};
    dict[20]={key:'?'};
    dict[21]={key:'/'};
    dict[22]={key:'|'};
    dict[23]={key:'%'};
    dict[24]={key:'^'};
    dict[25]={key:'@'};
    dict[26]={key:'$'};
    dict[27]={key:'&'};
    dict[28]={key:'*'};
    dict[29]={key:'_'};
    dict[30]={key:'0'};
    dict[31]={key:'1'};
    dict[32]={key:'2'};
    dict[33]={key:'3'};
    dict[34]={key:'4'};
    dict[35]={key:'5'};
    dict[36]={key:'6'};
    dict[37]={key:'7'};
    dict[38]={key:'8'};
    dict[39]={key:'9'};
    return dict;
}

function define(string){
    let kVarr=[];
    let forbidden=[];
    forbidden=fillForbidden();
    string=string.toLowerCase();
    for(let i=0;i<string.length;i++){
        let char=string.substring(i,i+1);

        if(dictLookup(char,forbidden)!=-1)continue;

        if(dictLookup(char,kVarr)==-1){
            kVarr[kVarr.length]=new KV(char,0);
        }

        kVarr[dictLookup(char,kVarr)].value++;
    }

    if(kVarr.length>=26){
        console.log('yes!');
        return 1;
    }
    console.log('no');
    return 0;
}

function start(){
    let input=document.querySelector("#in");
    input.addEventListener('change',doSearch);
}

function doSearch(){
    let input=document.querySelector("#in");
    let result=document.querySelector("#result");

    let out=define(input.value);
    if(out==1){
        result.innerHTML="This text contains all English alphabet letters";
    }else{
        result.innerHTML="This text does not contain all English alphabet letters";
    }
}


