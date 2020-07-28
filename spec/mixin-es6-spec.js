const Mixin = require('../src/es6');

describe("Mixin", function() {
  class TestMixin extends Mixin {
    static initClass() {
      this.c = 3;
      this.prototype.c = 6;
    }
    static included() { return this.includedCalled = true; }
    static a() { return 1; }
    static b() { return 2; }

    extended() { return this.extendedCalled = true; }
    a() { return 4; }
    b() { return 5; }
  }
  TestMixin.initClass();

  describe(".extend(object)", function() {
    let target = null;

    beforeEach(function() {
      target = {a: 1};
      TestMixin.extend(target);
    });

    it("adds all the mixin's prototype properties to the target object if they aren't already defined", function() {
      expect(target.a).toBe(1);
      expect(target.b()).toBe(5);
      expect(target.c).toBe(6);
    });

    it("calls the ::extended hook with the target as its context", () => expect(target.extendedCalled).toBe(true));
  });

  describe(".includeInto(class)", function() {
    class TargetClass {
      static initClass() {
        this.a = 1;
        this.prototype.a = 1;
      }
    };
    TargetClass.initClass();
    TestMixin.includeInto(TargetClass);

    it("adds all the mixin's class properties to the target class if they aren't already defined", function() {
      expect(TargetClass.a).toBe(1);
      expect(TargetClass.b()).toBe(2);
      expect(TargetClass.c).toBe(3);
    });

    it("adds all the mixin's prototype properties to the target class's prototype if they aren't already defined", function() {
      expect(TargetClass.prototype.a).toBe(1);
      expect(TargetClass.prototype.b()).toBe(5);
      expect(TargetClass.prototype.c).toBe(6);
    });

    it("overrides inherited prototype properties", function() {
      class TargetSubclass extends TargetClass {
        static initClass() {
          TestMixin.includeInto(this);
        }
      }
      TargetSubclass.initClass();

      expect(TargetSubclass.prototype.a()).toBe(4);
    });

    it("calls the .included hook with the target class as its context", () => expect(TargetClass.includedCalled).toBe(true));

    it("calls the ::extended hook with the target class's prototype as its context", () => expect(TargetClass.prototype.extendedCalled).toBe(true));
  });

  describe("construction", () => it("includes all the mixin prototype methods and calls the ::extended hook", function() {
    const instance = new TestMixin;
    expect(instance.a()).toBe(4);
    expect(instance.b()).toBe(5);
    expect(instance.c).toBe(6);
    expect(instance.extendedCalled).toBe(true);
  }));
});
