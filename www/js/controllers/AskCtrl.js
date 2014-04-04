function AskCtrl($scope, Spots) {

  $scope.user = {
    username: 'Gosia'
  }

  $scope.addSpot = function(username) {
    Spots.addSpot({
      username: username
    }, function() {
      console.log('spot added');
    });
  }

  $scope.getSpots = function(username) {
    Spots.getSpots(username);
  }

}