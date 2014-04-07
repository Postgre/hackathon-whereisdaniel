function AskCtrl($scope, Spots) {

  $scope.user = {
    username: 'gosia',
    spots: []
  }

  $scope.status = '';

  $scope.getSpots = function(username) {
    Spots.getSpot(username, function(response) {
      $scope.user.spots = response;
      $scope.$apply();
    });
  };

}