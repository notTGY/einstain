function convertSequenceToRender(trickSequence){
    tricksToRender=[...trickSequence];

    if(tricksToRender[0]=='switch'){//removing useless ollies like     ollie kickflip-> kickflip
        if(tricksToRender.length>=3 && tricksToRender[1]=='ollie'){
            let buffer=[];
            buffer[0]=tricksToRender[0];
            for(let i=2;i<tricksToRender.length;i++){
                buffer[i-1]=tricksToRender[i];
            }
            tricksToRender=[...buffer];
        }
    }else if(tricksToRender[0]=='ollie' && tricksToRender.length>=2){
        let buffer=[];
        for(let i=1;i<tricksToRender.length;i++){
            buffer[i-1]=tricksToRender[i];
        }
        tricksToRender=[...buffer];
    }

    if(tricksToRender[0]=='switch'){//We actually distinguishing tricks
        if(0){//for reading and copy-pasting purposes
        }else if(tricksToRender.length==3 && tricksToRender[1]==tricksToRender[2]){// SWITCH
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='double ';
            }else{
                buffer='360 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;
        }else if(tricksToRender.length==4 && tricksToRender[1]==tricksToRender[2] && tricksToRender[1]==tricksToRender[3]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='triple ';
            }else{
                buffer='540 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;
        }else if(tricksToRender.length==5 && tricksToRender[1]==tricksToRender[2] && tricksToRender[1]==tricksToRender[3] && tricksToRender[1]==tricksToRender[4]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='quad ';
            }else{
                buffer='720 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;

        }else if(tricksToRender[1]=='nollie'){                  //SWITCH  NOLLIE
            if(0){//for reading and copy-pasting purposes
            }else if(tricksToRender.length==4 && tricksToRender[3]==tricksToRender[2]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='double ';
                }else{
                    buffer='360 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='fakie '+buffer;
            }else if(tricksToRender.length==5 && tricksToRender[3]==tricksToRender[2] && tricksToRender[4]==tricksToRender[3]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='triple ';
                }else{
                    buffer='540 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='fakie '+buffer;
            }else if(tricksToRender.length==6 && tricksToRender[3]==tricksToRender[2] && tricksToRender[3]==tricksToRender[5] && tricksToRender[3]==tricksToRender[4]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='quad ';
                }else{
                    buffer='720 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='fakie '+buffer;

            }else{//basic case of switch nollie
                let buffer='';
                for(let i=1;i<tricksToRender.length;i++){
                    buffer+=tricksToRender[i]+' ';
                }
                tricksToRender=[];
                tricksToRender[0]='switch';
                tricksToRender[1]=buffer;
            }

        }else{//basic case of switch
            let buffer='';
            for(let i=1;i<tricksToRender.length;i++){
                buffer+=tricksToRender[i]+' ';
            }
            tricksToRender=[];
            tricksToRender[0]='switch';
            tricksToRender[1]=buffer;
        }
        }else{//no switch
        if(0){//for reading and copy-pasting purposes
        }else if(tricksToRender.length==2 && tricksToRender[0]==tricksToRender[1]){//REGULAR
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='double ';
            }else{
                buffer='360 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]=buffer;
        }else if(tricksToRender.length==3 && tricksToRender[1]==tricksToRender[0] && tricksToRender[1]==tricksToRender[2]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='triple ';
            }else{
                buffer='540 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]=buffer;
        }else if(tricksToRender.length==4 && tricksToRender[1]==tricksToRender[0] && tricksToRender[1]==tricksToRender[3] && tricksToRender[1]==tricksToRender[2]){
            let buffer;
            if(tricksToRender[1]=='heelflip'||tricksToRender[1]=='kickflip'){
                buffer='quad ';
            }else{
                buffer='720 '
            }
            buffer+=tricksToRender[1];
            tricksToRender=[];
            tricksToRender[0]=buffer;

        }else if(tricksToRender[0]=='nollie'){                  //REGULAR NOLLIE
            if(0){//for reading and copy-pasting purposes
            }else if(tricksToRender.length==3 && tricksToRender[1]==tricksToRender[2]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='double ';
                }else{
                    buffer='360 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='nollie '+buffer;
            }else if(tricksToRender.length==4 && tricksToRender[3]==tricksToRender[2] && tricksToRender[1]==tricksToRender[3]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='triple ';
                }else{
                    buffer='540 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='nollie '+buffer;
            }else if(tricksToRender.length==5 && tricksToRender[3]==tricksToRender[2] && tricksToRender[3]==tricksToRender[1] && tricksToRender[3]==tricksToRender[4]){
                let buffer;
                if(tricksToRender[2]=='heelflip'||tricksToRender[2]=='kickflip'){
                    buffer='quad ';
                }else{
                    buffer='720 '
                }
                buffer+=tricksToRender[2];
                tricksToRender=[];
                tricksToRender[0]='nollie '+buffer;

            }else{//basic case of regular nollie
                let buffer='';
                for(let i=0;i<tricksToRender.length;i++){
                    buffer+=tricksToRender[i]+' ';
                }
                tricksToRender=[];
                tricksToRender[0]=buffer;
            }

        }else{//basic case of regular
            let buffer='';
            for(let i=0;i<tricksToRender.length;i++){
                buffer+=tricksToRender[i]+' ';
            }
            tricksToRender=[];
            tricksToRender[0]=buffer;
        }


    }


}