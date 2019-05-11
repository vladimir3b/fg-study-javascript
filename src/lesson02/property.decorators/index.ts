/**
 * Property Decorating
 */
function format(target: any, propertyKey: string): void {
  let value = '';
  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (next: any) => {
      console.log(next);
      value = `❤️ ${next} ❤️`;
    }
  });
}

export class PersonSecond {
  @format
  public firstName: string;
  public lastName: string;
  public gender: 'male' | 'female';
  @format
  public birthDate: Date;

  constructor(
    firstName: string,
    lastName: string,
    gender: 'male' | 'female',
    birthDate: Date
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.birthDate = birthDate;
  }

  fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
  rawDetails(): PersonSecond {
    return this;
  }
}
