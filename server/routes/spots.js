var Spots = require('../app/database/Spots')

exports.all = function(req, res) {
  res.send(Spots.all());
};

exports.get = function(req, res) {
  res.send(
    Spots.get(req.params.username)
  );
};

exports.add = function(req, res) {
  Spots.add(req.body);
  res.send({
    success: true
  });
};