var Set = function() {
  var set = Object.create(setPrototype);
  set._storage = [];
  return set;
};

var setPrototype = {};

setPrototype.add = function(item) {
  if (!this.contains(item)) {
    this._storage.push(item);
  }
};

setPrototype.contains = function(item) {
  return _.indexOf(this._storage, item) >= 0;
};

setPrototype.remove = function(item) {
  if (this.contains(item)) {
    var location = _.indexOf(this._storage, item);

    this._storage = this._storage.slice(0, location).concat(this._storage.slice(location + 1));
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 - add: O(n)
 - contains: O(n)
 - remove: O(n)
 */
