describe('extract-github', function () {
  'use strict';

  var extract = require('../')
    , chai = require('chai')
    , expect = chai.expect;

  it('exports as a function', function () {
    expect(extract).to.be.a('function');
  });

  it('exports .url as a function', function () {
    expect(extract.url).to.be.a('function');
  });

  it('exports .type as a function', function () {
    expect(extract.type).to.be.a('function');
  });

  describe('.type', function () {
    it('detects arrays', function () {
      expect(extract.type([])).to.equal('array');
    });

    it('detects regexp', function () {
      expect(extract.type(/\./)).to.equal('regexp');
    });

    it('detects function', function fn() {
      expect(extract.type(fn)).to.equal('function');
    });

    it('detects string', function () {
      expect(extract.type('foo')).to.equal('string');
    });

    it('detects object', function () {
      expect(extract.type({})).to.equal('object');
    });
  });

  describe('.url', function () {
    it('returns the the string if given a matching string', function () {
      expect(extract.url('github.com', 'github')).to.equal('github.com');
    });

    it('retreives url properties', function () {
      expect(extract.url({ url: 'github.com'}, 'github')).to.equal('github.com');
    });

    it('retreives web properties', function () {
      expect(extract.url({ web: 'github.com'}, 'github')).to.equal('github.com');
    });

    it('returns the matching url only', function () {
      expect(extract.url({ url: 'google.com', web: 'github.com'}, 'github')).to.equal('github.com');
    });

    it('returns undefined on no match', function () {
      expect(extract.url('foo', 'bar')).to.equal(undefined);
    });
  });
});
