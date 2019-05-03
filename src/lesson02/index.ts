import * as utilities from './../.utilities';

// Demystifying TypeScript Decorators - https://www.youtube.com/watch?v=05FC8Wh7C5w
/**
 *  01 - Class decorators
 *
 *  A decorator is a function that is applied to the constructor of the class. It can be used to observe,
 *  modify or replace the class definition.
 *
 */

 // Simple class decorator -  adds a new method to the decorated object
const fullName = (target: Function) => {
  Object.defineProperty(target.prototype, 'fullName', {
    value: function() {
      // !!! If we used an arrow function instead 'this' would be undefined.
      return `${this.firstName} ${this.lastName}`
    }
  });
};

// If the class decorator returns a value, it will replace the class declaration with the provided constructor function.
function addDetails<T extends new(...myArguments: Array<any>) => {}>(classConstructor: T): T {
  return class extends classConstructor {
    age = 37;
    gender = 'male';
    children = [ 'Iosif', 'Maria', 'Timotei', 'Eva'];
  };
}

@addDetails
@fullName
class Person {
  children: Array<string> = []; // this will be overwritten by the constructor created with addDetails decorator
  constructor(public firstName: string, public lastName: string) {}
  fullName() { return 'blah blah'}; // this method will be overwritten by the decorator
}

const vladimir = new Person('Vladimir', 'Ioan');

// console.log(vladimir.fullName());
// console.log(vladimir);

/**
 *  02 - Method decorators
 *
 */

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: Array<any>) {
    console.log(`Now we are executing ${propertyKey} method...`);
    const result = originalMethod.apply(this, args);
    console.log('Execution done...', result);
  }
}

class SomeObjects {
  prop1: string;
  prop2: string;

  constructor() {
    this.prop1 = 'This is the first property of a random object.';
    this.prop2 = 'This is the second property of a random object.';
  }

  @log
  giveDetails(separator: string = '-'): string {
    console.log(this.prop1, separator , this.prop2);
    return 'This worked well...'
  }
}

const object1 = new SomeObjects();

object1.giveDetails();

/**
 *  03 - Property decorators
 *
 */

function format(target: any, propertyKey: string) {
  let value = target[propertyKey];
  const getter = () => value;
  const setter = (next: any) => value = `❤️ ${next} ❤️`;
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  })
}

class Person2 {
  @format firstName: string;
  lastName: string;

  constructor(first: string, last: string) {
    this.firstName = first;
    this.lastName = last;
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const aSpecialPerson = new Person2('John', 'Bonjovi');
console.log('Something for the pain:', aSpecialPerson.fullName());

/**
 * 0n - Factory decorators
 */

function details(object: {age: number, gender: 'male' | 'female', children?: Array<string>}) {
  return <T extends new (...myArguments: Array<any>) => {}>(classConstructor: T) => {
    return class extends classConstructor {
      age = object.age;
      gender = object.gender;
      children = object.children;
    }
  }
}

@details({
  age: 37,
  gender: 'male'
})
class OtherPerson1 {
  constructor(public firstName: string, public lastName: string) { }

  @log
  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

const someone1 = new OtherPerson1('John', 'Smith');
const someone2 = new OtherPerson1('David', 'Mitch');
someone1.fullName();

@details({
  age: 37,
  gender: 'female',
  children: ['Elisa', 'Beth', 'Lenin']
})
class OtherPerson2 {
  constructor(public firstName: string, public lastName: string) {}
}

const someone3 = new OtherPerson2('Jane', 'Smith');
const someone4 = new OtherPerson2('Nicole', 'Benjamin');
// console.log(someone3);
// console.log(someone4);

 /**
  * When multiples decorators are applied they fallow the function composition in mathematics rules:
  * The expressions for each decorator are evaluated top - to - bottom.
  * The results are then called as functions from bottom - to - top.
  */
