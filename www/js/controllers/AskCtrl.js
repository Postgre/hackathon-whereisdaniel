function AskCtrl($scope, Spots) {

  $scope.user = {
    username: 'Gosia',
    spots: []
  }

  $scope.status = '';

  $scope.addSpot = function(username) {

    var spot = {
      username: username,
      mac: ' 01:23:45:67:89:ab'
    };

    Spots.addSpot(spot, function() {
      $scope.status = 'new spot added';
      $scope.$apply();
    });
  };

  $scope.getSpots = function(username) {
    Spots.getSpots(username, function(response) {
      $scope.user.spots = response;
      $scope.$apply();
    });
  };

}