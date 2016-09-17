var BloomFilter = function() {
  this._storage = {};
  this._limit = 18;

  for (var i = 0; i < this._limit; i++) {
    this._storage[i] = false;
  }
};

BloomFilter.prototype.insert = function(item) {
  var hash1 = hashFunction1(item, this._limit);
  var hash2 = hashFunction2(item, this._limit);
  var hash3 = hashFunction3(item, this._limit);

  this._storage[hash1] = true;
  this._storage[hash2] = true;
  this._storage[hash3] = true;
};

BloomFilter.prototype.contains = function(item) {
  var hash1 = hashFunction1(item, this._limit);
  var hash2 = hashFunction2(item, this._limit);
  var hash3 = hashFunction3(item, this._limit);

  return this._storage[hash1] && this._storage[hash2] && this._storage[hash3];
};

var hashFunction1 = function(str, max) { // java .hashCode()
  var hash = 0;

  for (var i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }

  return hash % max;
};

var hashFunction2 = function(str, max) { // sdbm hash function
  var hash = 0;

  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash = char + (hash << 6) + (hash << 16) - hash;
  }

  return Math.abs(hash % max);
};

var hashFunction3 = function(str, max) { // loselose [K&R]
  var hash = 0;

  for (i = 0; i < str.length; i++) {
    char = str.charCodeAt(i);
    hash += char;
  }

  return Math.abs(hash % max);
};

// expected false positive rate for k = 3, m = 18, n = 6 (m/n = 3)
// ==> .253

var generateRandom = function() {
  var text = '';
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for ( var i = 0; i < 8; i++ ) {
    text += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return text;
};

// insert 6 random words into bloomFilter
var testBloomFilter = function() {
  var bloomFilter = new BloomFilter();
  var insertedWords = [];

  for (var i = 0; i < 6; i++) {
    var randomWord = generateRandom();
    insertedWords.push(randomWord);
    bloomFilter.insert(randomWord);
  }

  var result = 0;
  for (var j = 0; j < 10000; j++) {
    var randomWord = generateRandom();

    var actualResult = insertedWords.indexOf(randomWord) >= 0;
    var testResult = bloomFilter.contains(randomWord);

    if (actualResult !== testResult) {
      result++;
    }
  }

  return result / 10000;
};

var multipleTest = function () {
  var results = 0;
  
  for (var i = 0; i < 100; i++) {
    results += testBloomFilter();
  }

  return results / 100;
};

// expected false positive => .2530
// The test has been executed multiple times. The average result 
// is in the range of [0.28, 0.32], centering around 0.30. 
// We assume the result is larger than 0.2530 because of
// the poorly designed hash table and consistent string length.

