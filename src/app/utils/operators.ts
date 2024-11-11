import { Observable, throwError, timer } from 'rxjs';
import { delay, mergeMap } from 'rxjs/operators';

export function randomDelay<T>(min: number = 300, max: number = 1500) {
  const delayTime = Math.floor(Math.random() * (max - min + 1)) + min;
  return (source: Observable<T>) => source.pipe(delay(delayTime));
}

export function throwErrorWithDelay<T>(
  error: string,
  min: number = 300,
  max: number = 1500
): Observable<never> {
  const delayTime = Math.floor(Math.random() * (max - min + 1)) + min;

  return timer(delayTime).pipe(
    mergeMap(() => throwError(() => new Error(error)))
  );
}
