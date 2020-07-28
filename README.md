# Mixto: A simple mixin superclass [![Build Status](https://travis-ci.org/atom/mixto.png?branch=master)](https://travis-ci.org/atom/mixto)

# JavaScript Classes (ES6)

To create a mixin, subclass mixto:

```js
const Mixin = require('mixto/lib/es6')

class MyMixin extends Mixin {
  static classMethod() { console.log("foo"); }
  instanceMethod() { console.log("bar"); }
}
```

Then mix into classes with `.includeInto`:

```js
class MyClass {
  static initClass() {
    MyMixin.includeInto(this); // adds all the mixin's class properties or prototype properties to the target class if they aren't already defined
  }
}
MyClass.initClass();

MyClass.classMethod();
(new MyClass).instanceMethod();
```

Or extend individual objects with `.extend`:

```js
const myObject = {a: 1, b: 2};
MyMixin.extend(myObject);   // adds all the mixin's prototype properties to the target object if they aren't already defined
myObject.instanceMethod();
```

Or build standalone instances of your 'mixin':

```js
const standalone = new MyMixin;
standalone.instanceMethod();
```


# CoffeeScript 1 Classes (ES5)

To create a mixin, subclass mixto:

```coffee
Mixin = require 'mixto'

class MyMixin extends Mixin
  @classMethod: -> console.log("foo")
  instanceMethod: -> console.log("bar")
```

Then mix into classes with `.includeInto`:

```coffee
class MyClass
  MyMixin.includeInto(this)

MyClass.classMethod()
(new MyClass).instanceMethod()
```

Or extend individual objects with `.extend`:

```coffee-script
myObject = {a: 1, b: 2}
MyMixin.extend(myObject)
myObject.instanceMethod()
```

Or build standalone instances of your 'mixin':

```coffee-script
standalone = new MyMixin
standalone.instanceMethod()
```
