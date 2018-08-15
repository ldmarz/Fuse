"use strict";

const { each, concat, uniq, isArray, isString, isObject, isUndefined, isFunction } = require('lodash');
const { regexForSearch } = require('../consts');

class KeysIndexed {
  constructor() {
    this.ignoredKeys = [];
    this.allowedKeys = [];
  }
  getIgnoredKeys() {
    return [];
  }

  getAllowedArrayKeys() {
    return [];
  }

  setIgnoredKeys() {
    return [];
  }

  setAllowedArrayKeys() {
    return [];
  }

  getSearchableKeys(sourceData) {
    let keys = [];
    console.log(this.isAllowedKey);
    each(sourceData, value => {
      keys = concat(keys, this.mapKeysRecursive(value));
    });
    return uniq(keys);
  }

  mapKeysRecursive(data, parentKey = '') {
    let keys = [];
    each(data, (value, key) => {
      if (this.isAllowedKey(key) && this.isAllowedValue(value)) {
        if (
          (
            isArray(value) &&
            this.getAllowedArrayKeys().includes(key)
          ) ||
          (
            !isArray(value) &&
            isObject(value)
          )
        ) {
          keys = concat(
            keys,
            this.mapKeysRecursive(value, parentKey + (isString(key) ? key + '.' : ''))
          );
        } else {
          keys.push(parentKey + key);
        }
      }
    });
    return keys;
  }

  isAllowedValue(value) {
    if (isUndefined(value) || value === null) {
      return false;
    }

    if (isObject(value) && value._isAMomentObject) {
      return false;
    }

    if (isFunction(value)) {
      return false;
    }

    if (isString(value) && value.match(regexForSearch.regexpTag)) {
      return false;
    }

    if (isArray(value) && value.length === 0) {
      return false;
    }

    return true;
  }

  isAllowedKey(key) {
    return (this.getIgnoredKeys().indexOf(key) === -1);
  }
}

module.exports = new KeysIndexed();
