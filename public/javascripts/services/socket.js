angular.module('Streamy').service('socket', function($rootScope) {

  var result = {
    currentTrackName: '',
    status:           'disconnected'
  };

  var ws = new WebSocket(window.Streamy.socketUrl);

  ws.onopen = function() {
    $rootScope.$apply(function() {
      result.status = 'connected';
    });
  }

  ws.onmessage = function(data) {
    data = JSON.parse(data.data);
    $rootScope.$apply(function() {
      result.currentTrackName = data.currentTrackName;
    });
    console.log('onmessage', data);
  }

  return result;

});