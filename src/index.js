const combinedSearch = require('./helpers/combinedSearch');


function index(stringToSearch, list, options = {}) {
  if (stringToSearch === '') {
    return list;
  }

  combinedSearch.setFuseOptions(options, list);
  const result = combinedSearch.applyCombinedSearch(stringToSearch, list);

  return result;
}

module.exports = index;
