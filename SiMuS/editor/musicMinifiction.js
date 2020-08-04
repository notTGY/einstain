function convertNotes(lines){
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        for(let j=0;j<line.length;j++){
            let n=line[j];
            line[j]=[n.vol,n.f,n.type,n.dur];
        }
    }
    return lines;
}

function convertToNotes(lines){
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        for(let j=0;j<line.length;j++){
            let n=line[j];
            line[j]={vol:n[0],f:n[1],type:n[2],dur:n[3]};
        }
    }
    return lines;
}