var fs = require('fs');

function list(libraryPath, callback) {
  var files = [];
  fs.readdir(process.cwd() + libraryPath, function(err, data) {
    data = data.filter(function(item) {
      return item.split('.').reverse()[0] == 'mp3'
    });
    callback(null, data);
  });
}

module.exports = {
  list: list
}