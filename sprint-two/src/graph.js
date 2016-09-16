

// Instantiate a new graph
var Graph = function() {
  this.nodes = [];
  this.edges = [];
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  if (!this.contains(node)) {
    this.nodes.push(node);
  }
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return _.indexOf(this.nodes, node) >= 0;
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  if (this.contains(node)) {
    var location = _.indexOf(this.nodes, node);
    this.nodes = this.nodes.slice(0, location).concat(this.nodes.slice(location + 1));
  }

  for (var i = 0; i < this.edges.length; i++) {
    if (_.indexOf(this.edges[i], node) >= 0) {
      this.removeEdge(this.edges[i][0], this.edges[i][1]);
    }
  }
}; 

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  var lgNode = Math.max(fromNode, toNode);
  var smNode = Math.min(fromNode, toNode);

  for (var i = 0; i < this.edges.length; i++) {
    if (_.isEqual(this.edges[i], [smNode, lgNode])) {
      return true;
    }
  }

  return false;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  var lgNode = Math.max(fromNode, toNode);
  var smNode = Math.min(fromNode, toNode);

  if (!this.hasEdge(fromNode, toNode)) {
    this.edges.push([smNode, lgNode]);
  }
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  var lgNode = Math.max(fromNode, toNode);
  var smNode = Math.min(fromNode, toNode);
  var foundIndex;

  if (this.hasEdge(fromNode, toNode)) {
    for (var i = 0; i < this.edges.length; i++) {
      if (_.isEqual(this.edges[i], [smNode, lgNode])) {
        foundIndex = i;
        break;
      }
    }

    this.edges = this.edges.slice(0, foundIndex).concat(this.edges.slice(foundIndex + 1));
  } 
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  _.each(this.nodes, function(node) {
    cb(node);
  });
};

/*
 * Complexity: What is the time complexity of the above functions?
 - addNode: O(n)
 - contains: O(n)
 - removeNode: O(n^2)
 - hasEdge: O(n)
 - addEdge: O(n)
 - removeEdge: O(n)
 - forEachNode: O(n)
 */
