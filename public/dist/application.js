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
    currentTrackName: ''
  };

  var ws = new WebSocket(window.Streamy.socketUrl);

  ws.onopen = function() {
    $rootScope.$apply(function() {
      result.currentTrackName = 'hi :-)';
    });
  }

  ws.onmessage = function(data) {
    debugger;
    $rootScope.$apply(function() {
      result.currentTrackName = 'hi there :-)';
    });
    console.log('onmessage', data);
    console.log('hi again');
  }

  return result;

});