function convertNotes(lines){
    for(let i=0;i<lines.length;i++){
        let line=lines[i];
        for(let j=0;j<line.length;j++){
            n=line[j];
            line[j]=[n.vol,n.f,n.type,n.dur];
        }
    }
    return lines;
}