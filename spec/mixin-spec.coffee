Mixin = require '../src/mixin'

describe "Mixin", ->
  class TestMixin extends Mixin
    @included: -> @includedCalled = true
    @a: -> 1
    @b: -> 2
    @c: 3

    extended: -> @extendedCalled = true
    a: -> 4
    b: -> 5
    c: 6

  describe ".extend(object)", ->
    target = null

    beforeEach ->
      target = {a: 1}
      TestMixin.extend(target)

    it "adds all the mixin's prototype properties to the target object if they aren't already defined", ->
      expect(target.a).toBe 1
      expect(target.b()).toBe 5
      expect(target.c).toBe 6

    it "calls the ::extended hook with the target as its context", ->
      expect(target.extendedCalled).toBe true

  describe ".includeInto(class)", ->
    TargetClass = null

    beforeEach ->
      class TargetClass
        @a: 1
        a: 1

      TestMixin.includeInto(TargetClass)

    it "adds all the mixin's class properties to the target class if they aren't already defined", ->
      expect(TargetClass.a).toBe 1
      expect(TargetClass.b()).toBe 2
      expect(TargetClass.c).toBe 3

    it "adds all the mixin's prototype properties to the target class's prototype if they aren't already defined", ->
      expect(TargetClass::a).toBe 1
      expect(TargetClass::b()).toBe 5
      expect(TargetClass::c).toBe 6

    it "overrides inherited prototype properties", ->
      class TargetSubclass extends TargetClass
        TestMixin.includeInto(this)

      expect(TargetSubclass::a()).toBe 4

    it "calls the .included hook with the target class as its context", ->
      expect(TargetClass.includedCalled).toBe true

    it "calls the ::extended hook with the target class's prototype as its context", ->
      expect(TargetClass::extendedCalled).toBe true

  describe "construction", ->
    it "includes all the mixin prototype methods and calls the ::extended hook", ->
      instance = new TestMixin
      expect(instance.a()).toBe 4
      expect(instance.b()).toBe 5
      expect(instance.c).toBe 6
      expect(instance.extendedCalled).toBe true
