import {
  interval,
  Observable,
  Observer,
} from 'rxjs';
import { map, throttleTime } from 'rxjs/operators';
import * as utilities from '../.utilities';


/**
 *  Lesson 02 - OBSERVABLES, OBSERVERS & SUBSCRIPTIONS | RxJS TUTORIAL
 *
 *  https://www.youtube.com/watch?v=Tux1nhBPl_w&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=2
 *
 *
 */

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


/**
 *  Lesson 03 - RxJS OPERATORS LIKE map() OR throttleTime() | RxJS TUTORIAL
 *
 *  https://www.youtube.com/watch?v=-nYQJkMpOHU&list=PL55RiY5tL51pHpagYcrN9ubNLVXF8rGVi&index=3
 *
 *
 */

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