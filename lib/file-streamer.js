// var fs = require('fs')
// var Throttle = require('stream-throttle').Throttle

// function streamFile(file, bitrate) {
//   var file = fs.createReadStream(file)
//     .pipe(new Throttle({rate: bitrate}))
//   file.on('data', function(chunk) {
//     // console.log('got %d bytes of data', chunk.length)
//   })
//   file.on('close', function() {
//     console.log('finished, queueing up the next record')
//   })
//   return file;
// }

// module.exports = {
//   start: start,
//   stop:  stop
// }