let allRooms = [];
let currentDayOfTheWeek = (new Date()).getDay();
let currentTime = {};
currentTime.hours = (new Date()).getHours();
currentTime.minutes = (new Date()).getMinutes();
let timetable = [
  {key: 1, value: {start: {hours: 9, minutes: 0}, end: {hours: 10, minutes: 25}}},
  {key: 2, value: {start: {hours: 10, minutes: 45}, end: {hours: 12, minutes: 10}}},
  {key: 3, value: {start: {hours: 12, minutes: 20}, end: {hours: 13, minutes: 45}}},
  {key: 4, value: {start: {hours: 13, minutes: 55}, end: {hours: 15, minutes: 20}}},
  {key: 5, value: {start: {hours: 15, minutes: 30}, end: {hours: 16, minutes: 55}}},
  {key: 6, value: {start: {hours: 17, minutes: 5}, end: {hours: 18, minutes: 30}}},
  {key: 7, value: {start: {hours: 18, minutes: 35}, end: {hours: 20, minutes: 0}}}
];

let currentPara = 0;
timetable.forEach(e => {
  if (e.value.start.hours*60+e.value.start.minutes <= currentTime.hours*60+currentTime.minutes) {
    if (e.value.end.hours*60+e.value.end.minutes >= currentTime.hours*60+currentTime.minutes) {
      currentPara = e.key;
    }
  }
});

console.log('current para: '+ currentPara);
