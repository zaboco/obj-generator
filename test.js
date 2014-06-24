should = require('chai').should();

var objGenerator = require('./');

suite('obj-generator', function() {

	function Point(x, y) {
		this.x = x;
		this.y = y;
	}

	Point.prototype.value = function() {
		return [this.x, this.y].join(':');
	};

	var point = objGenerator(Point)(1, 2);

	test('method calls work', function() {
		point.value().should.eql('1:2');
	});

	test('instanceof', function() {
		(point instanceof Point).should.eql(true);
	});

	test('getPrototypeOf', function() {
		Object.getPrototypeOf(point).should.eql(Point.prototype);
	});

	test('constructor', function() {
		point.constructor.should.eql(Point);
	});

});
