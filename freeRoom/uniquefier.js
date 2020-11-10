function makeUnique(arr) {
  let res = [];
  arr.forEach(e => {
    if (find(e, res) == -1) {
      if (e != '') {
        res[res.length] = e;
      }
    }
  });
  return res.sort((a,b)=>{if(a>b) return 1; return -1;});
}
