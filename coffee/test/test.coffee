generatecList = require '../app'

assert = require "assert"
describe 'Generated Commander List', ->
    list = null
    it 'should have length 5', ->
        list = generatecList(5)
        assert.equal(5, list.length)

    it 'should have valid stats', ->
        list = generatecList(5)
        for c in list
            assert.equal(c.statsNo, c.stats.firstStat + c.stats.secondStat + c.stats.thirdStat)
            
