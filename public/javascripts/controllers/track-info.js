angular.module('Streamy').controller('TrackInfoController', ['$scope', 'socket', function($scope, socket) {

  $scope.socket = socket;

  $scope.title = socket.currentTrackName;

}]);