const { regexForSearch } = require('../consts');
const { map, each, trim, concat } = require('lodash');
const keysHelper = require('./keysIndexed');
const Fuse = require('fuse.js');

class CombinedSearch {
  constructor() {
    this.options = []
  }

  applyCombinedSearch(searchedString, results) {
    let arrayString = null;

    if (!searchedString.match(regexForSearch.regexValidOperators)) {
      results = this.fuseSearch(searchedString, results);
    }

    if (searchedString.match(regexForSearch.regexUnion)) {
      results = this.applySubSetSearch(searchedString, results);
      searchedString = '';
    }

    if (searchedString.match(regexForSearch.regexOr)) {
      // or operator 😉
      let temp = [];
      arrayString = this.parsingString(searchedString, regexForSearch.regexOr);
      each(arrayString, searchedString => {
        temp = concat(temp, this.applyCombinedSearch(searchedString, results));
      });
      searchedString = '';
      results = temp;
    }

    if (searchedString.match(regexForSearch.regexAnd)) {
      // AND operator 😉
      arrayString = this.parsingString(searchedString, regexForSearch.regexAnd);
      each(arrayString, searchedString => {
        results = this.fuseSearch(searchedString, results);
      });
    }

    return results;
  }

  applySubSetSearch(searchedString, poolData) {
    const arrayString = this.parsingString(searchedString, regexForSearch.regexUnion);
    each(arrayString, searchedString => {
      poolData = this.applyCombinedSearch(searchedString, poolData);
    });
    searchedString = '';

    return poolData;
  }

  parsingString(inputString, splitBy) {
    const split = inputString.split(splitBy);
    return map(split, trim);
  }

  fuseSearch(searchedString, sourceData) {
    const fuse = this.updateIndex(sourceData);
    const results = fuse.search(searchedString);

    return results;
  }

  updateIndex(sourceData) {
    // Posible improvement only index the keys one time 🤔
    const options = this.getOptionsFuse(sourceData);
    return new Fuse(sourceData, options);
  }

  getOptionsFuse() {
    return this.options;
  }

  setFuseOptions(options, sourceData) {
    this.options = options;

    this.options.keys = this.options.keys || keysHelper.getSearchableKeys(sourceData);
    this.options.threshold = this.options.threshold || 0.1;
    this.options.findAllMatches = this.options.findAllMatches || true;
  }
}

module.exports = new CombinedSearch();