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
    [4, 6],
    [9, 12]
  ]
};

const currentMatches = { 1: [[1, 7]], 3: [[1, 4], [5, 9.5]], 5: [[5, 7], [8, 10]] };

function updateCommon(input) {
  const commonDates = getCommonDates(input);
  
  let newMatches = {};

  for(const date of commonDates) {
    let p1 = 0, p2 = 0;

    inputTimeSlots = input[date];
    matchedTimeSlots = currentMatches[date];

    while(p1 < inputTimeSlots.length && p2 < matchedTimeSlots.length) {
      const inputStart = inputTimeSlots[p1][0];
      const inputEnd = inputTimeSlots[p1][1];
      const matchedStart = matchedTimeSlots[p2][0];
      const matchedEnd = matchedTimeSlots[p2][1];

      console.log({date});
      console.log({inputStart}, {inputEnd});
      console.log({matchedStart}, {matchedEnd});

      //if between
      if(!(inputStart - matchedEnd >= 0 && inputEnd - matchedStart >= 0) || (inputStart - matchedEnd <= 0 && inputEnd - matchedStart <= 0)) {
        console.log('in between');
        const newStart = inputStart > matchedStart ? inputStart : matchedStart;
        const newEnd = inputEnd < matchedEnd ? inputEnd : matchedEnd;

        const newMatchedTimeSlot = [newStart, newEnd];

        //update new matches
        if(newMatches[date]) {
          newMatches[date].push(newMatchedTimeSlot)
        } else {
          newMatches[date] = [newMatchedTimeSlot]
        }
      } 

      if(inputEnd > matchedEnd) p2++;
      else p1++;
    }
  }

  console.log(newMatches);
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


// const date1 = document.querySelector("#date1");
// const date2 = document.querySelector("#date2");
// date1.addEventListener("change", () => {
//   console.log(date1.value - date2.value);
// });

//Todo
//x1. change number to date
//x2. get common time-slots for sorted time-slots
//3. need to simplify time-slots input?
