function AppCtrl($scope, Spots) {
  $scope.text = "blablabla";

  $scope.propertyFromSpots = Spots.getProperty();
}