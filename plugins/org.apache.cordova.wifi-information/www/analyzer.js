var exec = require('cordova/exec');

var WifiAnalyzer = function() {};

WifiAnalyzer.prototype.getNetworks = function(successCallback, failureCallback) {
	exec(successCallback, failureCallback, 'WifiInformation', null, []);
}

var wifiAnalyzer = new WifiAnalyzer();
module.exports = wifiAnalyzer;
