var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  var instance = {
    count: 0,
    nextIn: 0,
    nextOut: 0,
    storage: {},
  };
  
  _.extend(instance, queueMethods);

  return instance;
};

var queueMethods = {};
queueMethods.enqueue = function(value) {
  this.storage[this.nextIn] = value;
  this.nextIn++;
  this.count++;
};

queueMethods.dequeue = function() {
  var temp = this.storage[this.nextOut];
  delete this.storage[this.nextOut];
  this.nextOut++;
  if (this.count > 0) {
    this.count--;
  }
  return temp;
};

queueMethods.size = function() {
  return this.count;
};
