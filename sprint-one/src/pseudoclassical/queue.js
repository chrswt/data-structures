var Queue = function() {
  // Hey! Rewrite in the new style. Your code will wind up looking very similar,
  // but try not not reference your old code in writing the new style.
  this.count = 0;
  this.nextIn = 0;
  this.nextOut = 0;
  this.storage = {};
};

Queue.prototype.enqueue = function(value) {
  this.storage[this.nextIn] = value;
  this.nextIn++;
  this.count++;
};

Queue.prototype.dequeue = function() {
  var temp = this.storage[this.nextOut];
  delete this.storage[this.nextOut];
  this.nextOut++;
  if (this.count > 0) {
    this.count--;
  }
  
  return temp;
};

Queue.prototype.size = function() {
  return this.count;
};
