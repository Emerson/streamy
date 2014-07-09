var fs = require('fs')
var routes = require('./routes')
var through = require('through')
var express = require('express')
var duplexer = require('duplexer')
var WebSocketServer = require('ws').Server
var saxamaphone = require('./lib/saxamaphone')
var fileStreamer = require('./lib/file-streamer')


var app = express()
app.use(express.static(process.cwd() + '/public'))
app.use(express.static(process.cwd() + '/vendor'))
app.engine('html', require('ejs').renderFile)

var streamer = through(function(buf) {
  this.queue(buf)
});


var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port)
})

var wss = new WebSocketServer({server: server})

routes(app, streamer)


wss.on('connection', function(ws) {
  
  saxamaphone.setup(streamer, ws)

  // var id = setInterval(function() {
  //   ws.send(JSON.stringify(process.memoryUsage()), function() { /* ignore errors */ })
  // }, 100)
  // console.log('started client interval')

  ws.on('close', function() {
    console.log('stopping client interval')
    // clearInterval(id)
  })

  ws.on('message', function(data) {
    console.log(data)
  })

});