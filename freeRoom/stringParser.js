function convertToRoomNumber(str) {
  let res = str;
  res = str.substring(str.length-9);
  res = res.substring(0, res.indexOf('ГК'));
  for (let i = 0; i < 6; i++) {
    if (res[res.length-1] == ' ') {
      res = res.substring(0, res.length - 1);
    }
  }
  for (let i = 0; i < 6; i++) {
    if (res[0] == '5' || res[0] == '4' || res[0] == '3' || res[0] == '2' || res[0] == '1') {
      ;
    } else {
      res = res.substring(1);
    }
  }
  return res;
}
