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

console.log(vladimir.fullName());
console.log(vladimir);

/**
 * 02 - Factory decorators
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
}

const someone1 = new OtherPerson1('John', 'Smith');
const someone2 = new OtherPerson1('David', 'Mitch');
console.log(someone1);
console.log(someone2);

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
console.log(someone3);
console.log(someone4);

 /**
  * When multiples decorators are applied they fallow the function composition in mathematics rules:
  * The expressions for each decorator are evaluated top - to - bottom.
  * The results are then called as functions from bottom - to - top.
  */
