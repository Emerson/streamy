var fs = require('fs')
var library = require('./library')
var Throttle = require('stream-throttle').Throttle

var currentSong;

function play(song, callback) {
  var file = fs.createReadStream(process.cwd() + '/files/' + song)
    .pipe(new Throttle({rate: 18000}))
  file.on('end', function() {
    console.log('next song....', 'end')
    callback()
  });
  return file
}


function setup(streamer, ws) {

  var currentSong = '';

  ws.on('open', function() {
    sendSongData(currentSong, ws)
  })

  /*-- Start the loop -----------------------------------------------------*/
  library.list('/files', function(err, songs, res) {

    var i = 0
    startPlay(songs[i])

    function startPlay(song) {
      currentSong = song;
      sendSongData(currentSong, ws)

      play(song, function() {
        if(i == songs.length) {
          i = 0
        }
        currentSong = i;
        startPlay(songs[i])
        i++
      }).pipe(streamer, {end: false})
    }

  })
}


function sendSongData(song, ws) {
  ws.send(JSON.stringify({currentTrackName: song}))
}

module.exports = {
  setup: setup,
  play:  play
}