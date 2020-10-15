//input list of dates and time-slots
//determine common dates and time-slots

input1 = {
  10: [
    [9, 15],
    [10, 12],
    [19, 23]
  ],
  15: [
    [1, 5],
    [14, 15],
    [20, 23],
  ],
  18: [
    [1, 4],
    [6, 12],
    [20, 21],
  ]
}

input2 = {
  10: [
    [14, 19],
    [1, 3],
    [20, 21],
    [13, 15]
  ],
  15: [
    [2, 4],
    [16, 21],
    [13, 14],
    [14, 18],
  ],
  17: [
    [6, 8],
    [13, 19],
    [14, 20],
  ],
  18: [
    [7, 12],
    [9, 15],
    [14, 15],
    [13, 20],
    [6, 9],
    [1, 2]
  ]
}

let currentMatches = null;

function updateCommon(input) {
  if(!currentMatches) currentMatches = input;

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

      // console.log({date});
      // console.log({inputStart}, {inputEnd});
      // console.log({matchedStart}, {matchedEnd});

      //if between
      if(!((inputStart - matchedEnd >= 0 && inputEnd - matchedStart >= 0) || (inputStart - matchedEnd <= 0 && inputEnd - matchedStart <= 0))) {
        // console.log('in between');
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
      else if(inputEnd < matchedEnd) p1++;
      else {
        p1++;
        p2++;
      }
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

// m dates
// n timeSlots
// O(mn)
function simplifyTimeSlots(input) {
  //input are dates and time-slots
  const simplifiedInput = {};

  Object.keys(input).forEach((date, i) => {
    simplifiedInput[date] = [];

    const timeSlots = input[date];
    let comparatorPointer = 0, currentPointer = 0, potentialNewEnd = timeSlots[0][1];

    while(comparatorPointer < timeSlots.length) {
      const currentStart = timeSlots[currentPointer][0], 
            currentEnd = timeSlots[currentPointer][1],
            nextStart = comparatorPointer < timeSlots.length - 1  ? timeSlots[comparatorPointer + 1][0] : null,
            nextEnd = comparatorPointer < timeSlots.length - 1 ? timeSlots[comparatorPointer + 1][1] : null;

      // console.log({currentStart}, {currentEnd}, {nextStart}, {nextEnd});

      if(nextStart && currentEnd >= nextStart) {
        //Must has a nextStart. i.e. comparatorPointer is not pointing to last element
        //Can be simplified, so continue and see if next slot can also be simplified
        potentialNewEnd = Math.max(potentialNewEnd , nextEnd);
        comparatorPointer ++;
      } else {
        //Can't be simplified
        if(comparatorPointer !== currentPointer) {
          // console.log(date, {currentEnd}, {comparatorEnd});
          const newTimeSlot = [currentStart, potentialNewEnd];
          simplifiedInput[date].push(newTimeSlot);
        } else {
          const newTimeSlot = [currentStart, currentEnd];
          simplifiedInput[date].push(newTimeSlot);
        }
        //update time-slot to compare
        comparatorPointer ++;
        currentPointer = comparatorPointer;
      }
    }
  });

  return simplifiedInput;
}

function sortTimeSlots(input) {
  // let sortedInput = {};

  Object.keys(input).forEach((date) => {
    const timeSlots = input[date];

    for(let i = 1; i < timeSlots.length; i++) {
      const currentTimeSlot = timeSlots[i];
      let j = i - 1;
      for(j; j >= 0; j--) {
        if(timeSlots[j][0] > currentTimeSlot[0]) {
          timeSlots[j + 1] = timeSlots[j];
        } else {
          break;
        }
      }
      timeSlots[j + 1] = currentTimeSlot;
    }
  });

  return input;
}

//Test Codes
// updateCommon(input);
// const simplifiedInput = simplifyTimeSlots(notSimplifiedInput)
// console.log(simplifiedInput);
// updateCommon(simplifiedInput);

const sortedInput1 = sortTimeSlots(input1);
console.log('sorted input1', sortedInput1);
const simplifiedInput1 = simplifyTimeSlots(sortedInput1);
console.log('input 1', simplifiedInput1);
const updatedOutput1 = updateCommon(simplifiedInput1)
const sortedInput2 = sortTimeSlots(input2);
const simplifiedInput2 = simplifyTimeSlots(sortedInput2);
const updatedOutput2 = updateCommon(simplifiedInput2)






// const date1 = document.querySelector("#date1");
// const date2 = document.querySelector("#date2");
// date1.addEventListener("change", () => {
//   console.log(date1.value - date2.value);
// });

//Todo 
//1. convert all numbers to times

//Todo (future)
//1. Notetify user after simplifying time-slots?
