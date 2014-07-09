window.Streamy = {
  socketUrl: 'ws://0.0.0.0:3000'
};

angular.module('Streamy', []);
angular.module('Streamy').controller('TrackInfoController', ['$scope', 'socket', function($scope, socket) {

  $scope.socket = socket;

  $scope.title = socket.currentTrackName;

}]);
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

  ws.onclose = function() {
    $rootScope.$apply(function() {
      result.status = 'disconnected'
    });
  }

  return result;

});