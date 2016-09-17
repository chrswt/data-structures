var BinarySearchTree = function(value) {
  var binarySearchTree = Object.create(BinarySearchTree.prototype);

  binarySearchTree.value = value;
  binarySearchTree.left = {};
  binarySearchTree.right = {};

  return binarySearchTree;
};

BinarySearchTree.prototype.insert = function(value) {
  this.cleanInsert(value);

  if (this.findMinDepth() * 2 < this.findMaxDepth()) {
    this.rebalance();
  }
};

BinarySearchTree.prototype.contains = function(value) {
  if (this.value === value) {
    return true;
  } else if (this.value > value) {
    //go left
    if (_.isEqual(this.left, {})) {
      return false;
    } else {
      return this.left.contains(value); 
    }
  } else {
    //go right
    if (_.isEqual(this.right, {})) {
      return false;
    } else {
      return this.right.contains(value);  
    }
  }
};

BinarySearchTree.prototype.depthFirstLog = function(cb) {
  cb(this.value);

  if (!_.isEqual(this.left, {})) {
    this.left.depthFirstLog(cb);
  } 

  if (!_.isEqual(this.right, {})) {
    this.right.depthFirstLog(cb);
  }
};

BinarySearchTree.prototype.breadthFirstLog = function(cb) {
  var openQueue = [];
  var closeQueue = [];

  var traverse = function (node) {
    var currentNode = node;
    closeQueue.push(currentNode);
    if (!_.isEqual(currentNode.left, {})) {
      openQueue.push(currentNode.left);
    } 
    if (!_.isEqual(currentNode.right, {})) {
      openQueue.push(currentNode.right);
    }
    if (openQueue.length !== 0) {
      traverse(openQueue.shift());
    }
  };

  traverse(this);
  
  _.each(closeQueue, function(node) {
    cb(node.value);
  });
};

BinarySearchTree.prototype.findMinDepth = function() {
  var minDepth;

  if (_.isEqual(this.left, {}) && _.isEqual(this.right, {})) {
    minDepth = 1;
  } else {
    if (_.isEqual(this.left, {})) {
      minDepth = this.right.findMinDepth() + 1;
    } else if (_.isEqual(this.right, {})) {
      minDepth = this.left.findMinDepth() + 1;
    } else {
      minDepth = Math.min(this.left.findMinDepth(), this.right.findMinDepth()) + 1;
    }
  }

  return minDepth;
};

BinarySearchTree.prototype.findMaxDepth = function() {
  var maxDepth;

  if (_.isEqual(this.left, {}) && _.isEqual(this.right, {})) {
    maxDepth = 1;
  } else {
    if (_.isEqual(this.left, {})) {
      maxDepth = this.right.findMaxDepth() + 1;
    } else if (_.isEqual(this.right, {})) {
      maxDepth = this.left.findMaxDepth() + 1;
    } else {
      maxDepth = Math.max(this.left.findMaxDepth(), this.right.findMaxDepth()) + 1;
    }
  }

  return maxDepth;
};

BinarySearchTree.prototype.rebalance = function() {
  var list = [];

  var traverse = function(node) {
    list.push(node.value);
    if (!_.isEqual(node.left, {})) {
      traverse(node.left);
    } 
    if (!_.isEqual(node.right, {})) {
      traverse(node.right);
    }
  };

  traverse(this);

  var sortedList = list.sort(function(a, b) {
    return a > b;
  });

  var newTree;
  var created = false;
  var rebuild = function(sortedArray) {
    var mid = Math.floor(sortedArray.length / 2);
    if (created === false) {
      newTree = BinarySearchTree(sortedArray[mid]);
      created = true;
    } else {
      newTree.cleanInsert(sortedArray[mid]);
    }

    var leftArray = sortedArray.slice(0, mid);
    var rightArray = sortedArray.slice(mid + 1);
    
    if (leftArray.length !== 0) {
      rebuild(leftArray);
    }
    if (rightArray.length !== 0) {
      rebuild(rightArray);
    }

    return newTree;
  };
  
  // replace existing tree with newly built tree
  var newTree = rebuild(sortedList);
  this.value = newTree.value;
  this.left = newTree.left;
  this.right = newTree.right;
};

BinarySearchTree.prototype.cleanInsert = function(value) {
  var node = BinarySearchTree(value);

  if (node.value < this.value) {
    //go left
    if (_.isEqual(this.left, {})) {
      this.left = node;
    } else {
      this.left.insert(value);
    }

  } else {
    //go right
    if (_.isEqual(this.right, {})) {
      this.right = node;
    } else {
      this.right.insert(value);
    }
  }
};


/*
 * Complexity: What is the time complexity of the above functions?
 - insert: O(log n)
 - contains: O(log n)
 - depthFirstLog: O(n) 
 */
