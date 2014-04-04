WifiInfoCtrl = function($scope, Spots) {
  $scope.info = "";

  $scope.propertyFromSpots = Spots.getAllSpots();

  if (navigator.network.connection.type === Connection.WIFI) {
    navigator.wifi.getNetworks(function(accessPoints) {
        $scope.info = JSON.stringify(accessPoints);
    });
  } else {
    $scope.info = navigator.network.connection.type;
  }

};