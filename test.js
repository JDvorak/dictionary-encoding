const test = require('tape')
const encode = require('./').encode
const decode = require('./').decode

test('should assert input types', function (t) {
  t.plan(1)
  var testArr = ['hello', 'world', ',', 'my darling']

  // Take each index
  var dictionary = {
    '1': 'hello',
    '200': 'world',
    '1093390123': 'my darling',
    '2': ','
  }

  var inverseDictionary = Object.keys(dictionary)
    .reduce((acc, ea) => { acc[dictionary[ea]] = ea; return acc }, {})

  // TODO: Fuzz this module with test-check
  encode(inverseDictionary, testArr, function (err, buffer) {
    if (err) throw err
    decode(dictionary, buffer, function (err, returnArr) {
      if (err) throw err
      t.deepEquals(testArr, returnArr, 'Reconstructs string appropriately')
    })
  })
})
