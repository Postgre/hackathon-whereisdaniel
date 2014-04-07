WifiInfoCtrl = function($scope, Spots) {
	$scope.info = "";

	navigator.wifi.getNetworks(function(accessPoints) {
		$scope.info = JSON.stringify(accessPoints);
	});

};