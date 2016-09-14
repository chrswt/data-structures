var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};
  var count = 0;
  var nextOut = 0;
  var nextIn = 0;
  // Implement the methods below

  someInstance.enqueue = function(value) {
    storage[nextIn] = value;
    nextIn++;
    count++;
  };

  someInstance.dequeue = function() {
    var temp = storage[nextOut]; 
    delete storage[nextOut];
    nextOut++;
    if (count > 0) {
      count--;
    }
    return temp; 
  };

  someInstance.size = function() {
    return count;
  };

  return someInstance;
};
