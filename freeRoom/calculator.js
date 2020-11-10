function calculateFreeRooms(taken) {
  let res = [];
  allRooms.forEach(e => {
    if (find(e,taken) == -1) {
      res[res.length] = e;
    }
  });
  
  console.log(res);
}

function find(elem, arr) {
  arr.forEach((e, i) => {
    if (e == elem) {
      return i;
    }
  });

  return -1;
}
