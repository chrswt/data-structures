var Tree = function(value, parent) {
  var newTree = {};
  newTree.value = value; 
  newTree.parent = parent || null;

  newTree.children = [];
  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  this.children.push(Tree(value, this));

  // this.children.push(Tree(value, this));
  //
};

treeMethods.contains = function(target) {
  if (this.value === target) {
    return true;
  } else {
    return _.reduce(this.children, function(foundTarget, child) {
      return foundTarget = foundTarget ? foundTarget : child.contains(target);
    }, false);
  }
};

treeMethods.removeFromParent = function() {
  var childIndex;

  if (this.parent !== null) {
    for (var i = 0; i < this.parent.children.length; i++) {
      if (this.parent.children[i].value === this.value) {
        childIndex = i;
        break;
      }
    }

    this.parent.children = this.parent.children.slice(0, childIndex).concat(this.parent.children.slice(childIndex + 1)); 
  }

  this.parent = null;
};

treeMethods.traverse = function(callback) {
  callback(this.value);

  _.each(this.children, function(child) {
    child.traverse(callback);
  });
};

/*
 * Complexity: What is the time complexity of the above functions?
 - addChild: O(1)
 - contains: O(n)
 */
