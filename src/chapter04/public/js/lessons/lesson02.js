const Rx = window['rxjs'];
const {
  Observable,
  defer,
  of,
  empty,
  throwError,
  interval,
  range,
  timer,
  from,
  fromEvent
} = Rx;

const {
  startWith,
  take
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

  static interval() {
    interval(1000).pipe(
      take(14)
    ).subscribe(console.log);
  }

  static range() {
    range(1, 5).subscribe(console.log);
  }

  static timer() {
    timer(3000, 1000).pipe(
      take(20)
    ).subscribe(console.log);
  }

  static of() {
    of(1, 2, 3, [1, 2, 3], {
      name: 'John',
      age: 37
    }).subscribe(console.log);
  }

  static from() {
    function* generateDoubles(seed) {
      let i = seed;
      while (true) {
        yield i;
        i = 2 * i; // double it
      }
    }

    from(generateDoubles(3))
      .pipe(take(10))
      .subscribe(console.log);
  }

  static fromEvent() {
    fromEvent(document, 'click')
      .subscribe(console.log);
  }

}