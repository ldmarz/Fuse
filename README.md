## Fuse-Operators

This library is based on [fusejs](http://fusejs.io/).

It was inspired on adding logic operators to be able to apply different conditions on a string search just like would normally do on the SQL Language. No back-end database is needed, just javascript objects.

## Installation

```bash
$ npm i fuse-operators
```

## How to use

```javascript
// Data example
const mockData = [
  {
    "title": "Old Man's War",
    "author": {
      "firstName": "John",
      "lastName": "Scalzi"
    }
  },
  {
    "title": "The Lock Artist",
    "author": {
      "firstName": "John",
      "lastName": "Hamilton"
    }
  }
];
```

#### AND Operator
```javascript
const query = 'old man && scalzi';
const result = fuseWithOperators(query, mockData);
// → [{"title": "Old Man's War", "author": {"firstName": "John", "lastName": "Scalzi"}}]
```

#### OR Operator
```javascript
const query = 'old man || artist';
const result = fuseWithOperators(query, mockData);
// → [{"title": "Old Man's War", "author": {"firstName": "John", "lastName": "Scalzi"}}, {"title": "The Lock Artist", "author": {"firstName": "John", "lastName": "Hamilton"}}]
```

#### SUBSET Operator
```javascript
const query = 'old man || the lock artist > scalzi';
const result = fuseWithOperators(query, mockData);
// → [{"title": "Old Man's War", "author": {"firstName": "John", "lastName": "Scalzi"}}]
```

## Available operators

| Operator | Description |
|--|--|
| \|\| | OR operator |
| && | AND operator |
| > | SUBSET operator. Applies a second search on the left side result |

## Tests

```bash
$ npm run test:watch
```

## Contributors

All PRs are welcome :) just make sure you pass all tests.

## License

MIT License