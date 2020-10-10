//input list of dates and time-slots
//determine common dates and tine-slots

const input = {
  1: [
    [2, 6],
    [7, 8]
  ],
  3: [
    [3, 6],
    [9, 10]
  ],
  4: [
    [3, 6],
    [9, 10]
  ],
  5: [
    [3, 6],
    [9, 10]
  ]
};

const currentCommon = { 1: [[1, 7]], 3: [[1, 7]], 5: [[1, 7]] };

function updateCommon(input) {
  const commonDates = getCommonDates(input);
  console.log(commonDates);
}

function getCommonDates(input) {
  let newCommonDates = [];

  for (const date in input) {
    if (currentCommon[date]) {
      newCommonDates.push(date);
    }
  }

  return newCommonDates;
}

updateCommon(input);
