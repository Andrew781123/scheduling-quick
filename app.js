//input list of dates and time-slots
//determine common dates and time-slots

const input = {
  1: [
    [8, 9],
    [12, 15],
    [18, 20]
  ],
  5: [
    [13, 14],
    [16, 20]
  ],
  9: [
    [7, 9],
    [15, 18],
    [21, 22]
  ],
};

const notSimplifiedInput = {
  1: [
    [8, 16],
    [12, 15],
    [18, 20],
    [21, 23]
  ],
  5: [
    [13, 16],
    [15, 20]
  ],
}

const currentMatches = {
  1: [
    [7, 10],
    [14, 20],
    [22, 24]
  ],
  3: [
    [21, 23],
  ],
  5: [
    [12, 13],
    [16, 17]
  ],
  9: [
    [6, 8],
    [20, 23]
  ]
};

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

      // console.log({date});
      // console.log({inputStart}, {inputEnd});
      // console.log({matchedStart}, {matchedEnd});

      //if between
      if(!((inputStart - matchedEnd >= 0 && inputEnd - matchedStart >= 0) || (inputStart - matchedEnd <= 0 && inputEnd - matchedStart <= 0))) {
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
    let j = 0;

    while(j < timeSlots.length) {
      const currentStart = timeSlots[j][0], 
            currentEnd = timeSlots[j][1], 
            nextStart = j < timeSlots.length - 1 ? timeSlots[j + 1][0] : null, 
            nextEnd = j < timeSlots.length - 1 ? timeSlots[j + 1][1] : null;

      console.log({currentStart}, {currentEnd}, {nextStart}, {nextEnd});

      if(currentEnd > nextStart) {
        //Can be simplified
        const newTimeSlot = [currentStart, Math.max(currentEnd, nextEnd)];
        simplifiedInput[date].push(newTimeSlot);
        j += 2;
      } else {
        //Can't be simplified
        const newTimeSlot = [currentStart, currentEnd];
        simplifiedInput[date].push(newTimeSlot);
        j++;
      }
    }
  });

  return simplifiedInput;
}

//Test Codes
// updateCommon(input);
const simplifiedInput = simplifyTimeSlots(notSimplifiedInput)
console.log(simplifiedInput);
updateCommon(simplifiedInput)




// const date1 = document.querySelector("#date1");
// const date2 = document.querySelector("#date2");
// date1.addEventListener("change", () => {
//   console.log(date1.value - date2.value);
// });

//Todo 
//1. simplify input time-slots(number)

//Todo (future)
//1. sort and simplify input time-slots
//2. Notetify user after simplifying time-slots?
