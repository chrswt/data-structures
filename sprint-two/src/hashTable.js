var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);

  if (bucket === undefined) {
    this._storage.set(index, [[k, v]]); 
  } else {
    var tupleIndex = this.getIndex(index, k); 

    if (tupleIndex === undefined) {
      bucket.push([k, v]);
    } else {
      bucket[tupleIndex][1] = v;
    }

    this._storage.set(index, bucket);
  }
  
  this._count++;
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  var tupleIndex = this.getIndex(index, k);

  if (tupleIndex !== undefined) {
    return bucket[tupleIndex][1];  
  }
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);
  var result;

  if (bucket === undefined) {
    return undefined;
  } else {
    var tupleIndex = this.getIndex(index, k);

    if (tupleIndex !== undefined) {
      bucket = bucket.slice(0, tupleIndex).concat(bucket.slice(tupleIndex + 1));
      if (_.isEqual(bucket, [])) {
        bucket = undefined;
      }

      this._storage.set(index, bucket);
    }
  }

  this._count--;
};

HashTable.prototype.getIndex = function(index, k) {
  var bucket = this._storage.get(index);

  if (bucket === undefined) {
    return undefined;
  } 

  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === k) {
      return i;
    }
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 - insert: O(1) - average, O(n) - worst case
 - retrieve: O(1)
 - remove: O(1)
 */

// var HashTable = function() {
//   this._limit = 8;
//   this._storage = LimitedArray(this._limit);
//   this._movedIndexes = {};
// };

// ** Open Addressing Implementation **
// HashTable.prototype.insert = function(k, v) {
//   var index = getIndexBelowMaxForKey(k, this._limit);
//   if (this._storage.get(index) !== undefined) { // collision detected
//     while (this._storage.get(index) !== undefined) {
//       index++;
//     }
//     this._movedIndexes[k] = index;
//   }
//   this._storage.set(index, v);
// };

// HashTable.prototype.retrieve = function(k) {
//   var index = this._movedIndexes[k] || getIndexBelowMaxForKey(k, this._limit);
//   return this._storage.get(index);
// };

// HashTable.prototype.remove = function(k) {
//   var index = this._movedIndexes[k] || getIndexBelowMaxForKey(k, this._limit);
//   this._storage.set(index, undefined);
// };

// storage - [[[key1, value1], [key2, value2]], [], []]