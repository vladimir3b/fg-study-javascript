/**
 * Method Decorating
 *
 */

function log(target: Object, methodName: string, descriptor: PropertyDescriptor): any {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args: Array<any>) {
    const result = `Message on ${ new Date().toLocaleDateString() }: ${ originalMethod.apply(this, args) }`;
    return result;
  }
  return descriptor;
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
  details(): string {
    return `${this.fullName()} is ${this.gender === 'male' ? 'man' : 'woman'} born on ${ this.birthDate.toLocaleString() }.`
  }
}
