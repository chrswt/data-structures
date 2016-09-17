describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  it('should insert values at the correct location in the tree', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3]);
  });

  it('should execute depthFirstLog with deeply nested BST', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(1);
    binarySearchTree.insert(3);
    binarySearchTree.insert(4);
    binarySearchTree.insert(9);
    binarySearchTree.insert(10);
    binarySearchTree.insert(7);
    binarySearchTree.insert(8);
    binarySearchTree.insert(6);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 1, 3, 4, 9, 7, 6, 8, 10]);
  });

  it('should have a breadthFirstLog method', function() {
    expect(binarySearchTree.breadthFirstLog).to.be.a('function');
  });

  it('should execute breadthFirstLog with a deeply nested, unbalanced, BST', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(10);
    binarySearchTree.insert(15);
    binarySearchTree.insert(3);
    binarySearchTree.insert(1);
    binarySearchTree.insert(4);
    binarySearchTree.breadthFirstLog(func);
    expect(array).to.eql([5, 2, 10, 1, 3, 15, 4]);
  });

  it('should be able to find a tree\'s minimum and maximum depth', function() {
    binarySearchTree.insert(3);
    binarySearchTree.insert(4);
    binarySearchTree.insert(7);
    binarySearchTree.insert(2);
    binarySearchTree.insert(1);
    expect(binarySearchTree.findMinDepth()).to.equal(2);
    expect(binarySearchTree.findMaxDepth()).to.equal(4);
  });

  it('rebalancing can be called on a tree', function() {
    binarySearchTree.cleanInsert(4);
    binarySearchTree.cleanInsert(3);
    binarySearchTree.cleanInsert(2);
    binarySearchTree.cleanInsert(1);
    binarySearchTree.cleanInsert(6);
    binarySearchTree.cleanInsert(7);
    binarySearchTree.cleanInsert(10);
    binarySearchTree.cleanInsert(9);
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 4, 3, 2, 1, 6, 7, 10, 9]);
    binarySearchTree.rebalance();
    array = [];
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 3, 2, 1, 4, 9, 7, 6, 10]);
  });

  it('should automatically rebalance when maxDepth > 2x minDepth, but should not rebalance when maxDepth is only 2x minDepth', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(4);
    binarySearchTree.insert(6);
    binarySearchTree.insert(7);
    binarySearchTree.insert(8);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 4, 6, 7, 8]);
    binarySearchTree.insert(9);
    array = [];
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([7, 5, 4, 6, 9, 8]);
  });

});
