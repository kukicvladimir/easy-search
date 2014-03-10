(function() {
  var assert, generatecList;

  generatecList = require('../app');

  assert = require("assert");

  describe('Generated Commander List', function() {
    var list;
    list = null;
    it('should have length 5', function() {
      list = generatecList(5);
      return assert.equal(5, list.length);
    });
    return it('should have valid stats', function() {
      var c, _i, _len, _results;
      list = generatecList(5);
      _results = [];
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        c = list[_i];
        _results.push(assert.equal(c.statsNo, c.stats.firstStat + c.stats.secondStat + c.stats.thirdStat));
      }
      return _results;
    });
  });

}).call(this);
