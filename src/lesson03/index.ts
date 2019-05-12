import {
  interval,
  Observable,
  Observer,
  Subject,
} from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';


/**
 *  Lesson 02 - OBSERVABLES, OBSERVERS & SUBSCRIPTIONS | RxJS TUTORIAL
 *
 *  https://www.youtube.com/watch?v=Tux1nhBPl_w&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=2
 *
 *
 */

 /*

const observable2 = new Observable(observer => {
  let i = 0;
  let stop = false;
  while (!stop) { // this is a synchronous 'interval'
    i++;
    setTimeout(() => observer.complete(), 10); // because it is synchronous, this will never execute...
    observer.next(i);
    if (i === 150) {
      stop = true;
      observer.error('There was an error...')
    }
  }
});

const subscription2 = observable2
  .subscribe(
    value => console.log(value),
    error => console.error(error)
  );

setTimeout(() => subscription2.unsubscribe(), 10000);
*/

/**
 *  Lesson 03 - RxJS OPERATORS LIKE map() OR throttleTime() | RxJS TUTORIAL
 *
 *  https://www.youtube.com/watch?v=-nYQJkMpOHU&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=3
 *
 *
 */

 /*
const observable3 = interval(1000);

const observer3: Observer<number> = {
  next: value => console.log(value),
  error: error => console.error(`There has been an error: ${error}.`),
  complete: () => console.log('Observable is completed!')
};

const subscription3 = observable3
  .pipe(
    map(value => value * 10),
    throttleTime(2000)
  )
  .subscribe(observer3);


setTimeout(() => subscription3.unsubscribe(), 10000);
*/

/**
 * Lesson 04 - RxJS Subject
 */

const eventEmitter = new Subject();

eventEmitter.subscribe({
  next: value => console.log(`You have emitted ${value}.`),
  error: error => console.error(error),
  complete: () => console.log('Subject was completed')
})

eventEmitter.subscribe({
  next: (value: any) => {
    if (typeof value === 'number') {
      console.log(value);
    } else {
      console.log('Only number are logged.')
    }
  },
  error: () => console.error('There has been an error...')
});

// eventEmitter.next(50);
// eventEmitter.next('50');
// eventEmitter.error('Go to sleep NOW!')


/**
 * Lesson 05 - Subjects vs Observables
 */

const subject = new Subject<number>();
const observable = interval(5000);

const observer1: Observer<number> = {
  next: value => console.log(value),
  error: error => console.log(error),
  complete: () => console.log('Observable was completed...')
}

const observer2: Observer<number> = {
  next: value => console.log(`The value is ${value}.`),
  error: error => console.log(`The error is ${error}.`),
  complete: () => console.log(`We've completed the observable.`)
}

observable.subscribe(observer1);
observable.subscribe(observer2);
subject.subscribe(observer1);
subject.subscribe(observer2);

subject.next(500);

subject.next(2000);
subject.error('There was an error...');

// observable.next(5);