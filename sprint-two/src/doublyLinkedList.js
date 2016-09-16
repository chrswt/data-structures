var DoublyLinkedList = function() {
  
  this.head = null;
  this.tail = null;

  return this;
};

DoublyLinkedList.prototype.addToTail = function(value) {
  var newTail = Node(value);

  if (this.tail !== null) {
    newTail.previous = this.tail;
    this.tail.next = newTail;    
  } else {
    this.head = newTail;
  }

  this.tail = newTail;
};

DoublyLinkedList.prototype.removeHead = function() {
  if (this.head !== null) {
    var temp = this.head.value;

    if (this.head.next !== null) {
      this.head.next.previous = null;
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    
    return temp;
  }
};

DoublyLinkedList.prototype.contains = function(target) {
  var node = this.head;
  
  while (node !== null) {
    if (node.value === target) {
      return true;
    }
    node = node.next;
  }
  return false;
};

DoublyLinkedList.prototype.addToHead = function(value) {
  var newHead = new Node(value);

  if (this.head !== null) {
    newHead.next = this.head;
    this.head.previous = newHead;
  } else {
    this.tail = newHead;
  }

  this.head = newHead;
};

DoublyLinkedList.prototype.removeTail = function() {
  if (this.tail !== null) {
    var temp = this.tail.value;
    
    if (this.tail.previous !== null) {
      this.tail.previous.next = null;
      this.tail = this.tail.previous;
    } else {
      this.head = null;
      this.tail = null;
    }

    return temp;
  }
};


var Node = function(value) {
  var node = {};

  node.value = value;
  node.previous = null;
  node.next = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 - addToTail O(1)
 - removeHead O(1)
 - contains O(n)
 */
