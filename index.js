const vlqBuffer = require('vlq-buffer')
const lpstream = require('length-prefixed-stream')
const through = require('through2')

function encode (dictionary, stringArr, cb) {
  var encode = lpstream.encode()
  if (typeof stringArr === 'string') {
    stringArr = [stringArr]
  }

  stringArr
    .map(function dictionaryCompress (chunk) {
      let id = dictionary[chunk]
      if (id == null) {
        throw new Error(OODE)
      }
      return vlqBuffer.int2VLQBuffer(id)
    })
    .map((chunk) => encode.write(chunk))

  encode.end()

  if (cb) {
    toBuffer(encode, cb)
  } else {
    return encode
  }
}

function decode (dictionary, buffer, cb) {
  var decode = lpstream.decode()
  var output = through.obj(function uncompress (chunk, enc, callback) {
    let value = dictionary[vlqBuffer.vlqBuffer2Int(chunk)]
    if (value == null) {
      throw new Error(OODD)
    }
    this.push(value)
    callback()
  })

  decode.write(buffer)
  decode.end()

  decode.pipe(output)

  if (cb) {
    toArray(output, cb)
  } else {
    return output
  }
}

function toBuffer (stream, cb) {
  var bufs = []
  stream.on('data', (d) => bufs.push(d))
  stream.once('error', (err) => { cb(err); stream.end() })
  stream.once('end', () => cb(null, Buffer.concat(bufs)))
}

function toArray (stream, cb) {
  var items = []
  stream.on('data', (d) => items.push(d))
  stream.once('error', (err) => { cb(err); stream.end() })
  stream.once('end', () => cb(null, items))
}

const OODE = 'Out of dictionary error: data to be encoded is not represented by the dictionary provided.'
const OODD = 'Out of dictionary error: data to be decoded is not represented by the dictionary provided.'

module.exports = {
  encode: encode,
  decode: decode
}
