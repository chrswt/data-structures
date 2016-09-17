var BinarySearchTree = function(value) {
  var binarySearchTree = Object.create(BinarySearchTree.prototype);

  binarySearchTree.value = value;
  binarySearchTree.left = {};
  binarySearchTree.right = {};

  return binarySearchTree;
};

BinarySearchTree.prototype.insert = function(value) {
  var node = BinarySearchTree(value);

  var traverse = function(node) {
    if (node.value < this.value) {
      //go left
      if (_.isEqual(this.left, {})) {
        this.left = node;
      } else {
        traverse.call(this.left, node);
      }

    } else {
      //go right
      if (_.isEqual(this.right, {})) {
        this.right = node;
      } else {
        traverse.call(this.right, node);
      }
    }
  };

  traverse.call(this, node);
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


/*
 * Complexity: What is the time complexity of the above functions?
 - insert: O(log n)
 - contains: O(log n)
 - depthFirstLog: O(n) 
 */
