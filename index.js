var fs = require('fs')
var play = require('lib/play')
var through = require('through')
var express = require('express')
var duplexer = require('duplexer')
var bitrate = require('lib/bitrate')
var library = require('lib/library')
var fileStreamer = require('lib/file-streamer')

var app = express()
app.engine('html', require('ejs').renderFile)

app.get('/', function(req, res) {
  res.render('index.html');
})

var streamer = through(function(buf) {
  this.queue(buf)
});


//-- Setup the Grammophone --------------------------------------------------
library.list('/files', function(err, songs, res) {

  var i = 0
  startPlay(songs[i])

  function startPlay(song) {
    play(song, function() {
      if(i == songs.length) {
        i = 0
      }
      startPlay(songs[i])
      i++
    }).pipe(streamer, {end: false})
  }

});


app.get('/stream.mp3', function(req, res) {
  res.writeHead(200, {
    'Content-Type':              'audio/mpeg',
    'Content-Transfer-Encoding': 'binary'
  })
  if(streamer) {
    // duplexer(streamer, res)
    streamer.pipe(res)
  }else{
    console.log('CLOSING CONNECTIONG')
    res.end('No streaming today gang')
  }
})

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port)
})