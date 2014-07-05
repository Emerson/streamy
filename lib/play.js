module.exports = function(song, callback) {
  var file = fs.createReadStream(song)
    .pipe(new Throttle({rate: 16000}))
  file.on('close', function() {
    console.log('next song...')
    callback()
  })
  return file
}