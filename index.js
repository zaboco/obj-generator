module.exports = function(klass) {
	return function _generator() {
		var obj = Object.create(klass.prototype);
		klass.apply(obj, arguments);
		return obj;
	};
};
