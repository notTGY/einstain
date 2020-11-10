function processData(data) {
  let ttDoW = 0;
  let para = 0;
  data.forEach(e => {
    Object.keys(e).forEach(i => {
      let cell = e[i];
      if (typeof(cell) == 'string') {
        if (cell.indexOf('ГК') != -1) {
          allRooms[allRooms.length] = convertToRoomNumber(cell);
        }
        if (cell == 'Понедельник') {
          ttDoW = 1;
        } else if (cell == 'Вторник') {
          ttDoW = 2;
        } else if (cell == 'Среда') {
          ttDoW = 3;
        } else if (cell == 'Четверг') {
          ttDoW = 4;
        } else if (cell == 'Пятница') {
          ttDoW = 5;
        } else if (cell == 'Суббота') {
          ttDoW = 6;
        } else if (cell == 'Воскресенье') {
          ttDoW = 7;
        } else if(ttDoW) {
          if (cell == '900 - 1025') {
            para = 1;
          } else if (cell == '1045 - 1210') {
            para = 2;
          } else if (cell == '1220 - 1345') {
            para = 3;
          } else if (cell == '1355 - 1520') {
            para = 4;
          } else if (cell == '1530 - 1655') {
            para = 5;
          } else if (cell == '1705 - 1830') {
            para = 6;
          } else if (cell == '1835 - 2000') {
            para = 7;
          } else {
            if (para == currentPara && ttDoW == currentDayOfTheWeek) {
              if (cell.indexOf('ГК') != -1) {
                taken[taken.length] = convertToRoomNumber(cell);
              }
            }
          }
        }
      }
    });
  });
}
