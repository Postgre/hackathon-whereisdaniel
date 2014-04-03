exports.index = function(req, res) {
  res.render('index', {
    title: 'Express'
  });
};

exports.partials = function(req, res) {
  var partial = req.params.partial;
  res.render('partials/' + partial);
};