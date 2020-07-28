let ExcludedClassProperties = [ '__super__', 'includeInto', 'extend' ];
let ExcludedPrototypeProperties = ['constructor', 'extended'];

class MixinES6 {

  // adds all the mixin's class properties or prototype properties to the target class if they aren't already defined
  static includeInto(constructor) {
    this.extend(constructor.prototype);

    const allPropertyNames = _getAllPropertyNames(this)
    for (let name of allPropertyNames) {
      if (ExcludedClassProperties.indexOf(name) === -1) {
        if (!constructor.hasOwnProperty(name)) {
          _defineNormalProperty(constructor, name, this)
        } else if (!_hasPrototypeProperty(constructor, name)) {
          _definePrototypeProperty(constructor, name, this.prototype)
        }
      }
    }
    return this.included && this.included.call && this.included.call(constructor);
    // return this.included?.call(constructor);
  }


  // adds all the mixin's prototype properties to the target object if they aren't already defined
  static extend(object) {
    const allPropertyNames = _getAllPropertyNames(this)
    for (let name of allPropertyNames) {
      if (ExcludedPrototypeProperties.indexOf(name) === -1) {
        if (!object.hasOwnProperty(name)) {
          _defineNormalProperty(object, name, this.prototype)
        }
      }
    }
    return this.prototype && this.prototype.extended && this.prototype.extended.call && this.prototype.extended.call(object)
    // return this.prototype.extended?.call(object);
  }

  constructor() {
    if (typeof this.extended === 'function') {
      this.extended();
    }
  }
};

// checks if the prototype of the given object has a property
function _hasPrototypeProperty(object, name) {
  return object.prototype.hasOwnProperty(name)
}

// copy normal properties
function _defineNormalProperty(targetObj, name, source) {
  const propertyDescription = Object.getOwnPropertyDescriptor(source, name)
  if (propertyDescription) {
    Object.defineProperty(targetObj, name, propertyDescription)
  }
}

// copy protoype properties to prototype
function _definePrototypeProperty(targetObj, name, source) {
  // return if the obj does not have a prototype
  if (typeof targetObj.prototype !== 'object') {
    return
  }
  const propertyDescriptionFromPrototype = Object.getOwnPropertyDescriptor(source, name)
  if (propertyDescriptionFromPrototype) {
    Object.defineProperty(targetObj.prototype, name, propertyDescriptionFromPrototype)
  }
}

// get all the property names of an object. Includes both normal and prototype properties
function _getAllPropertyNames(obj) {
  const prototypeOwnPropertyNames = Object.getOwnPropertyNames(obj.prototype)
  const ownPropertyNames = Object.getOwnPropertyNames(obj)
  return [...prototypeOwnPropertyNames,  ...ownPropertyNames]
}

module.exports = MixinES6
