exports.list = function(req, res) {
  res.send([{
    name: 'KaAn'
  }, {
    name: 'MaJa'
  }]);
};

exports.get = function(req, res) {
  res.send({
    name: req.params.id
  });
};

exports.add = function(req, res) {
  res.send({
    success: true
  });
};