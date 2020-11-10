function calculateFreeRooms(taken) {
  allRooms = makeUnique(allRooms);
  taken = makeUnique(taken);
  let res = [];
  allRooms.forEach(e => {
    if (find(e,taken) == -1) {
      res[res.length] = e;
    }
  });
  printFreeRooms(res);
}
function find(elem, arr) {
  let retcode = -1;
  arr.forEach((e, i) => {
    if (isEqual(e,elem)) {
      retcode = i;
    }
  });
  return retcode;
}
function isEqual(a,b) {
  if (a.length != b.length) {
    return 0;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return 0;
    }
  }
  return 1;
}
