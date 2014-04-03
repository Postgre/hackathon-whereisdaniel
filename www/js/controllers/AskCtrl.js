function AskCtrl($scope) {

  $scope.user = {
    username: 'Gosia'
  }

  $scope.addSpot = function(username) {

    console.log('hello: ' + username);

  }

}