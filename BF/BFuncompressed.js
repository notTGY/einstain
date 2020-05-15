let code=''; //what is going to be written

let stack=[]; //basically stack, which our programm can use to do something

let index=0; //starting pointer to the stack

let adress=0; //adress is pointer to current command being done

let INPUT=undefined; //our input into programm



function getInput(){    //this is what called when we change input field
    let cons=document.querySelector('#cons');
    INPUT=cons.value;
}

function run(){     //this is what called when we have written our code

    let out=document.querySelector('#out'); //we clear errors and previous output
    out.innerHTML='';

    code=document.querySelector('#A').value;//we set up our code, stack, pointers
    stack=[];
    stack[0]=0;
    index=0;
    adress=0;

    while(adress!=code.length){ //go through the loop to run the code

        console.log(code.charAt(adress));//FIX ME

        if(code.charAt(adress)=='+'){
            incr();
        } else if(code.charAt(adress)=='-'){
            decr();
        } else if(code.charAt(adress)=='>'){
            next();
        } else if(code.charAt(adress)=='<'){
            previous();
        } else if(code.charAt(adress)=='.'){
            write();
        } else if(code.charAt(adress)==','){
            read();
        } else if(code.charAt(adress)=='['){
            check();
        } else if(code.charAt(adress)==']'){
            goto_last_check();
        } else {                                    //it`s nice to handle error if someone printed not normal char
            let out=document.querySelector('#out');
            out.innerHTML+='<div style="background-color:red">UNDEFINED OPERATION AT ADRESS '+adress+'</div>';
            adress++;
        }


    }



}


function incr(){ //increment current variable
    stack[index]++;
    if(stack[index]==255)stack[index]=0; //check overflow (BF is meant to handle vector of bytes)

    adress++; //go to next command
}

function decr(){ //decrement current variable
    stack[index]--;
    if(stack[index]==-1)stack[index]=255; //check overflow again

    adress++;//go to next command
}

function next(){ //move to next cell of stack
    index++;
    if(stack[index]==undefined)stack[index]=0;//we don`t want undefined value (we are allocating memory if it is undefined)

    adress++;//got to next command
}

function previous(){ //move to previous cell of stack if pointer will not be <0
    if(index>=1)index--;

    adress++;//go to next command
}

function read(){    //put number value of char (UTF-8) into stack
    if(INPUT==undefined){   //check error
        let out=document.querySelector('#out');
        out.innerHTML+='<div style="background-color:red">CANNOT READ NO CHAR</div>';
        adress++;
        return -1;
    }

    let s=INPUT.charAt(INPUT.length-1);//read last char (you can edit it)
    INPUT=INPUT.substring(0,INPUT.length-1);//remove last char

    adress++;//go to next line
    stack[index]=s.charCodeAt(0);//stack assignment
}

function write(){ //write number->UTF-8 char
    let out=document.querySelector('#out');
    out.append(String.fromCharCode(stack[index]));

    adress++;//go to next command
}


function check(){ //this is opening bracket
    if(stack[index]==0){    //we want to go to closing bracket matching this adress .
                            //we know the adress of this opening bracket and we need to know adress of closing one
        adress=get_new_adress();
    }else{
    adress++;               //else we need to do nothing (go to the next instruction)
    }
}



function goto_last_check(){// we want to go to the last matching bracket
    let depth=1;   //this is reversed algorithm of what you will see in get_new_adress() function
    let tmpadress=adress;
    while(depth!=0){
        tmpadress--;
        if(if_opening(tmpadress))depth--;
        if(if_closing(tmpadress))depth++;

        if(tmpadress<0){
            let out=document.querySelector('#out');
            out.innerHTML+='<div style="background-color:red">HAVE NOT FOUND MATCHING OPENING BRACKET</div>';
            adress=code.length+10;
            return -1;
        }
    }
    adress=tmpadress;
    return 0;
}


function get_new_adress(){ //we want to calculate our depth which starts from 1 (we are inside of opening bracket)
    let depth=1;
    let tmpadress=adress;//better to use temprorary variable to store our adress, but we could do without it
    while(depth!=0){ //while we haven`t escaped that loop
        tmpadress++;//move to next command
        if(if_opening(tmpadress))depth++;//if we see opening bracket we want to increment depth
        if(if_closing(tmpadress))depth--;//if we see closing - decrement

        if(tmpadress>=code.length){ //check overflow
            let out=document.querySelector('#out');
            out.innerHTML+='<div style="background-color:red">HAVE NOT FOUND MATCHING CLOSING BRACKET</div>';
            tmpadress=adress+1;//in case overflow happens we will escape execution
            return tmpadress;
        }
    }
    return tmpadress+1;
}

function if_opening(tmp){//just check if current command is '['
    if(code.charAt(tmp)=='[')return true;
    return false;
}

function if_closing(tmp){//just check if current command is ']'
    if(code.charAt(tmp)==']')return true;
    return false;
}