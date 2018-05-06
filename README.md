# dictionary-encoding [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Simple binary dictionary compression scheme.

## Usage
```js
const encode = require('dictionary-encoding').encode
const decode = require('dictionary-encoding').decode

const dictionary = {
  '1': 'hello',
  '2': 'world',
  '3': 'ya\'ll',
  '4': ','
}

const invertedDictionary = {
  'hello': '1',
  'world': '2',
  'ya\'ll': '3',
  ',': '4'
}

encode(dictionary, ['hello', 'world', ',', 'ya\'ll'], function (err, buffer) {
  decode(invertedDictionary, buffer, function (err, arr) {
    console.log(arr) // ['hello', 'world', ',', 'ya\'ll']
  })
})

```

## API
### dictionaryEncoding

* .encode(dictionary, data, [cb])
Encode takes a dictionary and swaps each item with the value stored under the dictionary key. This function
either returns a length prefixed stream of VLQ encoded buffers, or takes a callback which is provided a concatenation of the buffers that would otherwise be streamed.

* .decode(dictionary, data, [cb])
Encode takes a dictionary and swaps each item with the value stored under the dictionary key. This function
either returns an object stream of strings, or takes a callback which is provided an array of the strings that would otherwise be streamed.

## Installation
```sh
$ npm install dictionary-encoding
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/dictionary-encoding.svg?style=flat-square
[3]: https://npmjs.org/package/dictionary-encoding
[4]: https://img.shields.io/travis/jdvorak/dictionary-encoding/master.svg?style=flat-square
[5]: https://travis-ci.org/jdvorak/dictionary-encoding
[6]: https://img.shields.io/codecov/c/github/jdvorak/dictionary-encoding/master.svg?style=flat-square
[7]: https://codecov.io/github/jdvorak/dictionary-encoding
[8]: http://img.shields.io/npm/dm/dictionary-encoding.svg?style=flat-square
[9]: https://npmjs.org/package/dictionary-encoding
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
