import { cloneDeep } from 'lodash';

import { IPersonModel } from './data/models/person.model';
import { PERSONS } from './data/persons.data';

class ManagePersons {
  private static _persons: Array<IPersonModel>;
  static get persons(): Array<IPersonModel> {
    return cloneDeep(this._persons);
  }
  // static set persons(persons: Array<IPersonModel>) {
  //   this._persons = cloneDeep(persons);
  // }

  private static _findIndexById(id: string): number {
    return this._persons.findIndex(person => person.id === id);
  }
  static listPersons() {
    this.persons.forEach(person => console.log(person));
  }
  static addPerson(person: IPersonModel): void {
    if (this._findIndexById(person.id) === -1) {
      this._persons.push(person);
    }
  }
  static updatePerson(id: string, newPerson: IPersonModel): void {
    const idPersonToBeUpdated = this._findIndexById(id);
    if (idPersonToBeUpdated >= 0) {
      this._persons[idPersonToBeUpdated] = newPerson;
    }
  }
  static deletePerson(id: string) {
    const idPersonToBeDeleted = this._findIndexById(id);
    if (idPersonToBeDeleted >= 0) {
      this._persons.splice(idPersonToBeDeleted, 1);
    }
  }
  static deleteAllPersons(): void {
    this._persons = [];
  }

}
