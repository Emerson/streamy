var fs = require('fs')
var play = require('lib/play')
var express = require('express')
var bitrate = require('lib/bitrate')
var library = require('lib/library')
var fileStreamer = require('lib/file-streamer')


var app = express()
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res) {
  res.render('index.html');
})


// app.get('/info', function(req, res){
//   var filepath = 'files/test.mp3'
//   var stat = fs.statSync(filepath)
//   bitrate(filepath, function(err, bitrate) {
//     res.send('Info: '+ bitrate + '\nSize: ' + stat.size);
//   })
// })



var play = null;

//-- Setup the Grammophone --------------------------------------------------
library.list('/files', function(err, songs) {

  var i = 0
  startPlay(songs[i])

  function startPlay(song) {
    play(song, function() {
      if(i == songs.length) {
        i = 0
      }
      i++
      startPlay(songs[i])
    })
  }

});



// var filepath = 'files/test.mp3'
// // (128 * 1024)
// var streamer = fileStreamer(filepath, 16000)


app.get('/stream.mp3', function(req, res) {
  res.writeHead(200, {
    'Content-Type':              'audio/mpeg',
    'Content-Transfer-Encoding': 'binary'
  })
  play.pipe(res)
  // streamer.pipe(res)
})


var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port)
})