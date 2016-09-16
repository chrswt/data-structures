var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._count = 0;
};

HashTable.prototype.insert = function(k, v) {
  this.overrideInsert(k, v);
  
  this._count++;

  if (this._count > this._limit * 0.75) {
    this.resize('double');
  }
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

  if (bucket !== undefined) {
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

  if (this._count < this._limit * 0.25) {
    this.resize('halve');
  }
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

HashTable.prototype.resize = function(option) {
  var oldLimit = this._limit; 

  if (option === 'halve') {
    this._limit /= 2;
  } else if (option === 'double') {
    this._limit *= 2;
  }

  // copy all existing key-value pairs
  var copy = [];
  for (var i = 0; i < oldLimit; i++) {
    if (this._storage.get(i) !== undefined) {
      copy = copy.concat(this._storage.get(i));
    }
  }

  // create a new empty storage
  this._storage = LimitedArray(this._limit);
  
  // re-hash all key-value pairs
  _.each(copy, function(tuple) { 
    this.overrideInsert(tuple[0], tuple[1]);
  }.bind(this));
  //
};

HashTable.prototype.overrideInsert = function(k, v) {
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
