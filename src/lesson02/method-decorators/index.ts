/**
 * Method Decorating
 *
 */

function log(target: Object, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: Array<any>): string {
    const result = `Message on ${ new Date().toLocaleDateString() }: ${
      JSON.stringify(originalMethod.apply(this, args))
    }`;
    return result;
  }
  return descriptor;
}

function byGender(gender: 'male' | 'female'): (target: Object, methodName: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
  return function (target: Object, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    if (gender === 'male') {
      descriptor.value = function(...args: Array<any>): string {
        return 'If he is not a gay he loves women.';
      }
    }
    return descriptor;
  }
}

export class Person {
  constructor (
      public firstName: string,
      public lastName: string,
      public gender: 'male' | 'female',
      public birthDate: Date
  ) {}

  fullName(): string {
    return `${ this.firstName } ${ this.lastName }`;
  }
  @log
  @byGender('male')
  details(): string {
    return `${this.fullName()} is ${this.gender === 'male' ? 'man' : 'woman'} born on ${ this.birthDate.toLocaleString() }.`
  }
  @log
  rawDetails(): Person {
    return this;
  }
}
