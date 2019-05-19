/**
 * 1. What Are Observables and How to Create Them?
 */
const Rx = require('rxjs');
const RxOperators = require('rxjs/operators');
const {
  Observable,
  defer,
  of,
  from,
  throwError,
  empty,
  interval
 } = Rx;
const {
  switchMap,
  map
} = RxOperators;

class ObservableCreate {
  static example() {
    console.clear();
    console.log('Create a basic observable with Observable Create');
    const observable = Observable.create((observer) => {
      let count = 0;
      const id = setInterval(() => {
        observer.next('Hello!');
        count++;
        if (count === 5) {
          observer.complete();
        }
      }, 1000);
    });
    observable.subscribe(
      console.log,
      console.warn,
      () => console.log('Complete handler')
    );
  }
}

class Defer {
  static example() {
    console.clear();
    console.log('Create a basic observable with Defer');
    function ObservableFactory(n) {
      return of(n);
    }
    let counter = 0;
    let source$ = defer(() => ObservableFactory(counter++));
    source$.subscribe(data => console.log('1 ', data));
    source$.subscribe(data => console.log('2 ', data));
  }
}

class EmptyThrowError {
  static example(condition1, condition2) {
    console.clear();
    console.log('Create a basic observable with empty and throwError');
    of(13).pipe(
      switchMap(
        data => {
          if (condition1) {
            return throwError({ error: 'Error message'});
          }
          if (condition2) {
            return empty();
          }
          return interval(1000).pipe(
            map(data => `Number ${ data }`)
          );
        }
      )
    ).subscribe(
      data => console.log(data),
      error => console.error(error),
      () => console.log('Observable is completed')
    )
  }
}

class Of {
  static example() {
    console.clear();
    console.log('Create a basic observable with of');
    of('Anna', 'Julia', 'Helen', 'Christina', 'Jamila')
      .subscribe(console.log);
  }
}

class From {
  static example() {
    console.clear();
    console.log('Create a basic observable with of');
    from(['Anna', 'Julia', 'Helen', 'Christina', 'Jamila'])
      .subscribe(console.log);
  }
}

module.exports = {
  'create-observable-with-observable-create': ObservableCreate.example,
  'create-observable-with-defer': Defer.example,
  'create-observable-with-empty-and-throw-error': EmptyThrowError.example,
  'create-observable-with-of': Of.example,
  'create-observable-with-from': From.example
};