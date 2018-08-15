module.exports.regexForSearch = {
  regexpTag: new RegExp(/<([A-Z][A-Z0-9]*)\b[^>]*>/, 'i'),
  regexValidOperators: new RegExp(/\&&|\|\||>/),
  regexUnion: />/,
  regexOr: /\|\|/,
  regexAnd: /\&&/,
  orStringOperator: '||',
  andStringOperator: '&&',
  unionStringOperator: '>'
};