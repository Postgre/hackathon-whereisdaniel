var Strings = {

  matches: function(string, regex) {
    var index = 1;
    var matches = [];
    var match;
    while (match = regex.exec(string)) {
      console.log(match);
      matches.push(match[index]);
      index = index + 1;
    }
    return matches;
  }

};

module.exports = Strings;