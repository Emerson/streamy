var exec = require('child_process').exec

function getBitrate(filepath, callback) {
  var command = "file " + process.cwd() + '/' + filepath
  exec(command, function(err, stdout) {
    console.log(command, 'command')
    if(err) {
      console.log(err)
      callback(err)
    }
    var matches = stdout.match(/(\d+)\skbps/)
    if(matches && matches.length > 0) {
      callback(null, matches[1])
    }else{
      callback(null, false)
    }
  })
}

module.exports = getBitrate