const myArray = [10, 20, 30, 40, 50, 60];

class Programming {
  static imperative() {
    const myNewArray = [];
    console.log('Imperative Programming:');
    for (let i = 0; i <= myArray.length - 1; i++) {
      if (myArray[i] * 10 <= 300) {
        myNewArray.push(myArray[i]);
      }
    }
    console.log(myNewArray);
  }
  static declarative() {
    console.log('Declarative Programming:');
    const myNewArray = myArray
      .map(item => item * 10)
      .filter(item => item <= 300)
    console.log(myNewArray);
  }
}
