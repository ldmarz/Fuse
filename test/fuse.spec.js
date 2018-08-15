var assert = require('assert');
const mockData = require('./mockData.json');
const fuseWithOperators = require('../index');
const keyHelpers = require('../src/helpers/keysIndexed');
const options = {
  threshold: 0.1,
  findAllMatches: true
};
const { regexForSearch } = require('../src/consts');
const combinedSearch = require('../src/helpers/combinedSearch');

describe('Should index all keys by default', function () {
  it('Should index all keys', () => {
    const keys = keyHelpers.getSearchableKeys(mockData);
    const expected = ['title', 'author.firstName', 'author.lastName'];
    assert.deepEqual(keys, expected);
  });
});

describe('Testing fuse search without operators', function () {
  it('Should find Old Man\'s War', () => {


    const result = fuseWithOperators('Old Man', mockData, options);

    assert(result.length === 1);
  });

  it('Hamilton', () => {
    const result = fuseWithOperators('Old Man', mockData, options);

    assert(result.length === 1);
  });
});

describe('Should find results using operators', function () {
  it('Should find using && operator', () => {
    const result = fuseWithOperators('Old Man && John', mockData, options);

    assert(result.length === 1);
  });

  it('Should find using || operator', () => {
    const result = fuseWithOperators('Old Man || The Lock Artist', mockData, options);

    assert(result.length === 2);
  });

  it('Should find using || operator', () => {
    const result = fuseWithOperators('Old Man || The Lock Artist || HTML5', mockData, options);

    assert(result.length === 3);
  });

  it('Should find using in a subset the data', () => {
    const result = fuseWithOperators('Old Man || The Lock Artist > John', mockData, options);
    assert(result.length === 1);
  });
});


describe('Testing parsing input string', () => {
  it('Should split string by plus symbol', () => {
    const inputString = 'HOLA && MUNDO';
    const andOperator = regexForSearch.regexAnd;
    const result = combinedSearch.parsingString(inputString, andOperator);
    assert.deepEqual(result, ['HOLA', 'MUNDO']);
  });

  it('Should split string by double pipe symbol', () => {
    const inputString = 'HOLA || MUNDO';
    const orOperator = regexForSearch.regexOr;
    const result = combinedSearch.parsingString(inputString, orOperator);
    assert.deepEqual(result, ['HOLA', 'MUNDO']);
  });

});