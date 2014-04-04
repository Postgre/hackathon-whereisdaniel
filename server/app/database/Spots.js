var _ = require('underscore');

var spotsCollection = {};

var Spots = {

  add: function(spot) {
    spotsCollection[spot.username] = spotsCollection[spot.username] || [];
    spotsCollection[spot.username].push(spot);
  },

  get: function(username) {
    return spots.get({username : username});
  },

  all: function(username) {
    return _.reduce(spotsCollection, function(memo, items) {
      return memo.concat(items);
    }, [])
  },

};

module.exports = Spots;