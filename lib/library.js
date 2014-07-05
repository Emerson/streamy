var fs = require('fs');

function list(libraryPath, callback) {
  var files = [];
  fs.readdir(process.cwd() + libraryPath, function(err, data) {
    callback(null, data);
  });
}

module.exports = {
  list: list
}