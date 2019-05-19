/**
 * 1. What Are Observables and How to Create Them?
 */

class ObservableCreate {
  static example() {
    // const observable = Observable.create((observer) => {
    //   const id = setInterval(() => {
    //     observer.next('Hello!');
    //   }, 1000);
    // });
    // observable.subscribe(
    //   console.log,
    //   console.warn,
    //   () => console.log('Complete handler')
    // );
    console.log('Create a basic observable with Observable Create');
  }
}

module.exports = {
  'create-observable-with-observable-create': ObservableCreate.example
};