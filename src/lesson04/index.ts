import { of } from 'rxjs';

/**
 * JavaScript — Property Descriptor
 * https://codeburst.io/javascript-object-property-attributes-ac012be317e2*
 *
 */
let man = {
  name: {
    firstName: 'John',
    lastName: 'Smith'
  },
  gender: 'male',
  birthDate: '03-03-1996'
}

console.log(Object.getOwnPropertyDescriptor(man, 'name'));


/** Writable attribute  */
console.log((Object.getOwnPropertyDescriptor(man, 'name') as PropertyDescriptor).writable);
Object.defineProperty(man, 'gender', { writable: false }); // this will mark gender property as read-only
man.birthDate = '04-03-1994';
console.log(man);
// man.gender = 'female'; // this will throw an error, gender is read-only due to Object.defineProperty(man, 'gender', { writable: false });
// console.log(man);

Object.defineProperty(man, 'name', { writable: false });
// man.name = {
//   firstName: 'Brandon',
//   lastName: 'Smith'
// } // this will throw a read-only error
man.name.firstName = 'Brandon'; // but this will work...
console.log(man);
// to completely make a object property read-only we use freeze
Object.freeze(man.name);
// man.name.firstName = 'John'; // this will throw an error


/** Enumerable attribute */
function showProperties(object: Object, message: string) {
  console.log(message);
// tslint:disable-next-line: forin prefer-const
  for (let propertyName in object) {
    console.log(propertyName);
  }
}

man = {
  name: {
    firstName: 'John',
    lastName: 'Smith'
  },
  gender: 'male',
  birthDate: '03-03-1996'
}

showProperties(man, 'Object will list all properties:');

Object.defineProperty(man, 'gender', { enumerable: false });

showProperties(man, 'Properties with enumerate false will be skipped:');


/** Configurable attribute */
man = {
  name: {
    firstName: 'John',
    lastName: 'Smith'
  },
  gender: 'male',
  birthDate: '03-03-1996'
}

Object.defineProperty(man, 'gender', { configurable: false });
// Object.defineProperty(man, 'gender', { enumerable: false }); // this statement will throw an error
Object.defineProperty(man, 'gender', { writable: true }); // This will work
Object.defineProperty(man, 'gender', { writable: false }); // This will work
Object.defineProperty(man, 'gender', { writable: false }); // This will work
// Object.defineProperty(man, 'gender', { writable: true }); // This will not work

/** Setting all the attributes at once */
man = {
  name: {
    firstName: 'John',
    lastName: 'Smith'
  },
  gender: 'male',
  birthDate: '03-03-1996'
}
Object.defineProperty(man, 'gender', {
  enumerable: false,
  writable: false,
  configurable: false,
  value: ' mutant'
});

console.log(man); // gender will not appear
console.log(man.gender);

/** Setters and getters */
const man1 = {
  name: {
    firstName: 'John',
    lastName: 'Smith'
  },
  gender: 'male',
  birthDate: '03-03-1996',
}
Object.defineProperty(man, '_salary', {
  enumerable: false,
  configurable: false,
  writable: true,
  value: -1
})

Object.defineProperty(man, 'salary', {
  get: function(): string {
    return `His salary is ${ this._salary }$.`;
  },
  set: function(value: number) {
    this._salary = value;
  }
});
(man as any).salary = 50;
console.log((man as any).salary);
(man as any).salary = 90;
console.log((man as any).salary);

const manOfWar = {
  firstName: 'Thor',
  middleName: 'God',
  lastName: 'Odin',
  get fullName(): string {;
    return this.middleName ? `${this.firstName} ${this.middleName} ${this.fullName}` : `${this.firstName} ${this.fullName}`;
  },
  set fullName(fullName: string) {
    if (/^[a-zA-Z\s]*$/.test(fullName)) {
      const listOfNames = fullName.split(' ');
      switch (listOfNames.length) {
        case 0:
          this.firstName = '';
          this.middleName = '';
          this.lastName = '';
          break;
        case 1:
          this.firstName = listOfNames[0];
          this.middleName = '';
          this.lastName = '';
          break;
        case 2:
          this.firstName = listOfNames[0];
          this.middleName = '';
          this.lastName = listOfNames[1];
          break;
        default:
          this.firstName = listOfNames[0];
          this.middleName = listOfNames[1];
          this.lastName = listOfNames[2];
      }
    }
  }
}

console.log(manOfWar.fullName);