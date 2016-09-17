describe('bloomFilter', function() {
  var bloomFilter;

  beforeEach(function() {
    bloomFilter = new BloomFilter();
  });

  it('should have methods named "insert" and "contains"', function() {
    expect(bloomFilter.insert).to.be.a('function');
    expect(bloomFilter.contains).to.be.a('function');
  });

  it('should return true (probably yes) for items that have been inserted', function() {
    bloomFilter.insert('test item');
    expect(bloomFilter.contains('test item')).to.equal(true);
  });

  it('should return false (definitely not) for items that have not been added to the list', function() {
    bloomFilter.insert('test item');
    expect(bloomFilter.contains('not test item')).to.equal(false);
  });

});
