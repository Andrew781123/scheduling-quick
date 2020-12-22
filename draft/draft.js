let input = {
  10: [
    [1, 2, ["Andrew"]],
    [3, 6, ["Andrew"]],
    [7, 8, ["Andrew"]],
    [9, 18, ["Andrew"]],
    [20, 22, ["Andrew"]]
  ],

  11: [
    [1, 2, ["Andrew"]],
    [2, 6, ["Andrew"]],
    [7, 8, ["Andrew"]],
    [9, 18, ["Andrew"]],
    [20, 22, ["Andrew"]]
  ],

  12: [[12, 15, ["Andrew"]]],

  13: [
    [1, 2, ["Andrew"]],
    [3, 4, ["Andrew"]]
  ],
};

let currentMatched = {
  10: [
    [9, 10, ["Wendy", "May"]],
    [11, 17, ["May"]],
    [18, 20, ["May"]],
    [21, 23, ["Wendy", "May"]]
  ],

  11: [
    [1.5, 2.5, ["Wendy"]],
    [3, 8.5, ["May"]]
  ],

  12: [
    [12, 13, ["Wendy"]],
    [14, 16, ["May", "Wendy"]]
  ],

  13: [
    [10, 11, ["Wendy"]],
    [12, 13, ["Wendy", "May"]]
  ]
};

const updateCommon = input => {
  let output = {};
  Object.keys(input).forEach(date => {
    let i = 0,
      j = 0,
      inputHasLargerRange;
    output[date] = [];

    const inputTimeSlots = input[date];
    const matchedTimeSlots = currentMatched[date];
    
    let temp = [];

    while (i < inputTimeSlots.length && j < matchedTimeSlots.length) {
      const inputStart = inputTimeSlots[i][0],
        inputEnd = inputTimeSlots[i][1],
        matchedStart = matchedTimeSlots[j][0],
        matchedEnd = matchedTimeSlots[j][1];

      if (checkInBetween(inputStart, matchedStart, inputEnd, matchedEnd)) {
        //if in between
        if (temp.length == 0) {
          temp.push(inputTimeSlots[i], matchedTimeSlots[j]);

          if (inputEnd > matchedEnd) inputHasLargerRange = true;
          else inputHasLargerRange = false;
        } else {
          //If there are timeSlots in temp
          if (inputHasLargerRange) temp.push(matchedTimeSlots[j]);
          else temp.push(inputTimeSlots[i]);
        }

        if (inputHasLargerRange) j++;
        else i++;
      } else {
        //if not in between
        if (temp.length > 0) {
          //output the content in temp
          output[date] = [...output[date], ...splitTimeSlots(temp)];

          temp = [];

          if (inputHasLargerRange) i++;
          else j++;

          continue;
        }
        //temp is empty
        if (inputStart < matchedStart) {
          output[date].push(inputTimeSlots[i]);
          i++;
        } else {
          output[date].push(matchedTimeSlots[j]);
          j++;
        }
      }
    }

    if (temp.length > 0) {
      //clear temp if exists
      console.log(`in split timeslot, ${JSON.stringify(temp)}`)
      output[date] = [...output[date], ...splitTimeSlots(temp)];
      if (inputHasLargerRange) i++;
      else j++;
    }

    //push remaining timeSlots
    for (i; i < inputTimeSlots.length; i++) {
      output[date].push(inputTimeSlots[i]);
    }

    for (j; j < matchedTimeSlots.length; j++) {
      output[date].push(matchedTimeSlots[j]);
    }
  });

  return output;
};

const splitTimeSlots = timeSlots => {
  //e.g [20, 22, ['A']], [21, 23, ['Wendy', 'May']] 
  //   -> [20, 22, 21, 23]  (flatten)
  //   -> [20, 21, 22, 23]  (sorted)
  //   -> [[20, 21], [21, 22], [22, 23]]
  flattenedTimeSlots = flattenTimeSlots(timeSlots);
  console.log(`flattened: ${JSON.stringify(flattenedTimeSlots)}`);

  sorted = mergeSort(flattenedTimeSlots);

  const splittedTimeSlots = generateTimeSlots(sorted);
  console.log(`combined: ${JSON.stringify(splittedTimeSlots)}`);

  //push names of available people
  for (let i = 0; i < splittedTimeSlots.length; i++) {
    const splittedStart = splittedTimeSlots[i][0];
    const splittedEnd = splittedTimeSlots[i][1];

    for (let j = 0; j < timeSlots.length; j++) {
      const originalStart = timeSlots[j][0];
      const originalEnd = timeSlots[j][1];

      if (
        checkInBetween(splittedStart, originalStart, splittedEnd, originalEnd)
      ) {
        const people = timeSlots[j][2];
        if (splittedTimeSlots[i][2])
          splittedTimeSlots[i][2] = [...splittedTimeSlots[i][2], ...people];
        else splittedTimeSlots[i][2] = people;
      }
    }
  }

  return splittedTimeSlots;
};

function flattenTimeSlots(timeSlots) {
  const flattenedTimeSlots = [];

  for (let i = 0; i < timeSlots.length; i++) {
    flattenedTimeSlots.push(timeSlots[i][0], timeSlots[i][1]);
  }

  return flattenedTimeSlots;
}

function mergeSort(arr) {
  function sortTwoSorted(arr1, arr2) {
    let sortedArr = [];

    let p1 = 0,
      p2 = 0;

    while (p1 < arr1.length && p2 < arr2.length) {
      if (arr1[p1] < arr2[p2]) {
        sortedArr.push(arr1[p1]);
        p1++;
      } else {
        sortedArr.push(arr2[p2]);
        p2++;
      }
    }

    for (p1; p1 < arr1.length; p1++) {
      sortedArr.push(arr1[p1]);
    }

    for (p2; p2 < arr2.length; p2++) {
      sortedArr.push(arr2[p2]);
    }

    return sortedArr;
  }

  if (arr.length === 1) return arr;

  const mid = Math.floor(arr.length / 2);

  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return sortTwoSorted(left, right);
}

function generateTimeSlots(arr) {
  newTimeSlots = [];

  for (let i = 0; i < arr.length - 1; i++) {
    const newStart = arr[i];
    const newEnd = arr[i + 1];

    if (newStart === newEnd) continue;

    newTimeSlots.push([newStart, newEnd]);
  }

  return newTimeSlots;
}

const checkInBetween = (start1, start2, end1, end2) => {
  return !(
    (start1 - end2 <= 0 && end1 - start2 <= 0) ||
    (start1 - end2 >= 0 && end1 - start2 >= 0)
  );
};

const result = updateCommon(input);
Object.keys(result).forEach(date => {
  console.log(`${date}: `, result[date]);
});
// splitTimeSlots([[6, 9], [7, 8]])

module.exports = {
  checkInBetween
};
