function SendCtrl($scope, Spots) {

  $scope.user = {
    username: 'gosia',
    mac: '00:0A:E6:3E:FD:E1'
  }

  $scope.addSpot = function(username, mac) {

    var spot = {
      username: username,
      mac: mac
    };

    Spots.addSpot(spot, function() {
      $scope.status = 'New spot added';
      $scope.$apply();
    });
  };

}