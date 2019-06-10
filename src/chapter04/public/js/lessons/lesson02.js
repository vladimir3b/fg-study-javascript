const Rx = window['rxjs'];
const {
  Observable,
  defer,
  of,
  empty,
  throwError
} = Rx;

const {
  startWith
} = Rx.operators;

class Observables {

  static create() {
    const observable = Observable.create(observer => {
      let start = 1;
      setInterval(() => {
        observer.next(`hi ${start++}`);
        if (start >= 10) {
          observer.complete();
        }
        if (_.random(10, 50) % 2 === 0) {
          observer.error('There was an even random value.');
        }
      }, 1000);
    });
    observable.subscribe(
      console.log,
      console.warn,
      () => console.log('Observable completed.')
    );
  }

  static defer() {
    function createObservable(n) {
      if (n % 2 === 0) {
        return Observable.create(observer => {
          let start = 0;
          setInterval(() => {
            observer.next(`Hello, ${n} is an even value.`);
            if (start <= 10) {
              start++;
            } else {
              observer.error('Too many values');
            }
          }, 1000);
        })
      } else {
        return Observable.create(observer => {
          let start = n;
          setInterval(() => {
            observer.next(start++);
            if (start >= n + 15) {
              observer.complete()
            }
          }, 1500);
        })
      }
    }
    let counter = 0;
    let source$ = defer(() => createObservable(counter++));
    source$.subscribe(console.log);
    source$.subscribe(console.log, console.warn, () => console.log('Observable was completed.'));
  }

  static empty() {
    empty().pipe(
      startWith('Emits this and then completes.')
    ).subscribe(console.log);
  }

  static throwError() {
    throwError().pipe(
      startWith('Emits this and then throws an error.')
    ).subscribe(console.log);
  }

}