#obj-generator
--------------

Creates a class factory method with the same signature as the constructor

##Usage
```js
var generator = require('obj-generator');  

var instanceGenerator = generator(MyClass);  
var newInstance = instanceGenerator(1, 2);
// var newInstance = new MyClass(1, 2)
```

##Motivation
The main advantage of using a generator instead of a `new` invocation is that you can apply it to varargs.
So if, for example you want to create an object whose constructor takes a variable number of arguments, you can do: 
```js
var generator = require('obj-generator');

function List() {
	this.list = [].slice.call(arguments, 0);
}

List.create = generator(List);

var list = List.create(1, 2, 3); 
```

##Usecase
Let's say that you have a folder `lib` that declares classes `A`, `B`, `C`. 
Then, the `index.js` file might look like this: 
```js
var generator = require('obj-generator');

var classes = require('require-all')(__dirname);
Object.keys(classes).forEach(function(className) {
	exports[className] = generator(classes[className]); 
});
```

And a file using the `lib` might look like:
```js
var lib = require('./lib');

consumeAB(lib.A(lib.B()), lib.B(1)); 
// easier to read than 
// consumeAB(new lib.A(new lib.B()), new lib.B(1));
```
