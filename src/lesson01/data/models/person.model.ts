export interface IPersonModel {
  id: string;
  gender: 'male' | 'female';
  name: {
    firstName: string,
    lastName: string
  },
  birthDate: Date
}