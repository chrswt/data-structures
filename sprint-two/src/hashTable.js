var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._movedIndexes = {};
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  if (this._storage.get(index) !== undefined) { // collision detected
    while (this._storage.get(index) !== undefined) {
      index++;
    }
    this._movedIndexes[k] = index;
  }
  this._storage.set(index, v);
};

HashTable.prototype.retrieve = function(k) {
  var index = this._movedIndexes[k] || getIndexBelowMaxForKey(k, this._limit);
  return this._storage.get(index);
};

HashTable.prototype.remove = function(k) {
  var index = this._movedIndexes[k] || getIndexBelowMaxForKey(k, this._limit);
  this._storage.set(index, undefined);
};

/*
 * Complexity: What is the time complexity of the above functions?
 - insert: O(1) - average, O(n) - worst case
 - retrieve: O(1)
 - remove: O(1)
 */
