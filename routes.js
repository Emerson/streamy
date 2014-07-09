function draw(app, streamer) {

  app.get('/', function(req, res) {
    res.render('index.html');
  })

  app.get('/stream.mp3', function(req, res) {
    res.writeHead(200, {
      'Content-Type':              'audio/mpeg',
      'Content-Transfer-Encoding': 'binary'
    })
    if(streamer) {
      streamer.pipe(res)
    }else{
      console.log('CLOSING CONNECTIONG')
      res.end('No streaming today gang')
    }
  })

}

module.exports = draw