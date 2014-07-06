var fs = require('fs')
var Throttle = require('stream-throttle').Throttle

module.exports = function(song, callback) {
  var file = fs.createReadStream(process.cwd() + '/files/' + song)
    .pipe(new Throttle({rate: 16000}))
  file.on('end', function() {
    console.log('next song....', 'end')
    callback()
  });
  return file
}