//input list of dates and time-slots
//determine common dates and time-slots

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

const currentMatches = { 1: [[1, 7]], 3: [[1, 7]], 5: [[1, 7]] };

function updateCommon(input) {
  const commonDates = getCommonDates(input);
  console.log(commonDates);
}

function getCommonDates(input) {
  let newCommonDates = [];

  for (const date in input) {
    if (currentMatches[date]) {
      newCommonDates.push(date);
    }
  }

  return newCommonDates;
}

updateCommon(input);
const date1 = document.querySelector("#date1");
const date2 = document.querySelector("#date2");
date1.addEventListener("change", () => {
  console.log(date1.value - date2.value);
});

//Todo
//1. change number to date
//2. get common time-slots for sorted time-slots
//3. repeat 2 with unsorted time-slots
//4. need to simplify time-slots input?
