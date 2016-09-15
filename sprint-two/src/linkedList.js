var LinkedList = function() {
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value) {
    var newTail = Node(value);

    if (list.tail !== null) {
      list.tail.next = newTail;    
    } else {
      list.head = newTail;
    }

    list.tail = newTail;
  };

  list.removeHead = function() {
    var temp;

    if (list.head !== null) {
      temp = list.head.value;
      list.head = list.head.next;
    }

    return temp;
  };

  list.contains = function(target) {
    var node = list.head;
    
    while (node !== null) {
      if (node.value === target) {
        return true;
      }
      node = node.next;
    }
    return false;
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
