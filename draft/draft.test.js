const {checkInBetween} = require('./draft');

let input = {
  10: [
    [1, 2, ['Andrew']],
    [3, 6, ['Andrew']],
    [7, 8, ['Andrew']],
    [9, 18, ['Andrew']],
    [20, 22, ['Andrew']],
  ],

  11: [
    [1, 2, ['Andrew']],
    [2, 6, ['Andrew']],
    [7, 8, ['Andrew']],
    [9, 18, ['Andrew']],
    [20, 22, ['Andrew']],
  ],
}

let currentMatched = {
  10: [
    [9, 10, ['Wendy', 'May']],
    [11, 17, ['May']],
    [18, 20, ['May']],
    [21, 23, ['Wendy', 'May']],
  ],

  11: [
    [1.5, 2.5, ['Wendy']],
    [3, 8.5, ['May']]
  ]
}


test('update common time-slots', () => {
  expect(checkInBetween(1, 1.5, 2, 2.5)).toBe(true)
})