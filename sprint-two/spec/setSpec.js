describe('set', function() {
  var set;

  beforeEach(function() {
    set = Set();
  });

  it('should have methods named "add", "contains", and "remove"', function() {
    expect(set.add).to.be.a('function');
    expect(set.contains).to.be.a('function');
    expect(set.remove).to.be.a('function');
  });

  it('should add values to a set', function() {
    set.add('Susan Sarandon');
    set.add('Danny Glover');
    expect(set.contains('Danny Glover')).to.equal(true);
    expect(set.contains('Susan Sarandon')).to.equal(true);
  });

  it('should remove values from a set', function() {
    set.add('Mel Gibson');
    set.remove('Mel Gibson');
    expect(set.contains('Mel Gibson')).to.equal(false);
  });

  it('should not allow duplicate additions', function() {
    set.add('Donald Glover');
    set.add('Donald Glover');
    set.remove('Donald Glover');
    expect(set.contains('Donald Glover')).to.equal(false);
  });

  it('should be capable of handling numbers', function() {
    set.add(1);
    set.add(2);
    set.remove(2);
    expect(set.contains(1)).to.equal(true);
    expect(set.contains(2)).to.equal(false);
  });

  it('should be capable of handling mixed input of numbers and strings', function() {
    set.add(1);
    set.add(2);
    set.add('Test Case');
    set.remove(2);
    set.add('San Francisco');
    set.remove('San Francisco');
    expect(set.contains(1)).to.equal(true);
    expect(set.contains(2)).to.equal(false);
    expect(set.contains('San Francisco')).to.equal(false);
    expect(set.contains('Test Case')).to.equal(true);
  });

  it('should be capable of handling input objects of any type', function() {
    set.add([1, 2, 3]); 
    set.add({a: 1, b: 2});
    expect(set.contains([1, 2, 3])).to.equal(true);
    expect(set.contains({a: 1, b: 2})).to.equal(true);
    set.remove([1, 2, 3]); 
    set.remove({a: 1, b: 2});
    expect(set.contains([1, 2, 3])).to.equal(false);
    expect(set.contains({a: 1, b: 2})).to.equal(false);
  });

});
