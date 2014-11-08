module.exports =
class Mixin
  @includeInto: (constructor) ->
    @extend(constructor.prototype)
    for name, value of this
      unless name in ExcludedClassProperties or constructor.hasOwnProperty(name)
        constructor[name] = value
    @included?.call(constructor)

  @extend: (object) ->
    for name in Object.getOwnPropertyNames(@prototype)
      unless name in ExcludedPrototypeProperties or object.hasOwnProperty(name)
        object[name] = @prototype[name]
    @prototype.extended?.call(object)

  constructor: ->
    @extended?()

ExcludedClassProperties = ['__super__']
ExcludedClassProperties.push(name) for name of Mixin
ExcludedPrototypeProperties = ['constructor', 'extended']
