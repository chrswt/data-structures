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
});
