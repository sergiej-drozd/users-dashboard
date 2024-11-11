import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { randomDelay, throwErrorWithDelay } from './operators';

describe('randomDelay', () => {
  it('should delay the emission of values', (done) => {
    const start = Date.now();
    of('test')
      .pipe(randomDelay(300, 500))
      .subscribe((value) => {
        const end = Date.now();
        expect(value).toBe('test');
        expect(end - start).toBeGreaterThanOrEqual(300);
        expect(end - start).toBeLessThanOrEqual(500);
        done();
      });
  });

  it('should use 300 min and 2000 max by default', (done) => {
    const start = Date.now();
    of('test')
      .pipe(randomDelay())
      .subscribe((value) => {
        const end = Date.now();
        expect(value).toBe('test');
        expect(end - start).toBeGreaterThanOrEqual(300);
        expect(end - start).toBeLessThanOrEqual(2000);
        done();
      });
  });
});

describe('throwErrorWithDelay', () => {
  it('should throw an error after a delay', (done) => {
    const start = Date.now();
    throwErrorWithDelay('test error', 300, 500)
      .pipe(
        catchError((error) => {
          const end = Date.now();
          expect(error.message).toBe('test error');
          expect(end - start).toBeGreaterThanOrEqual(300);
          expect(end - start).toBeLessThanOrEqual(500);
          done();
          return of();
        })
      )
      .subscribe();
  });

  it('should use 300 min and 2000 max by default', (done) => {
    const start = Date.now();
    throwErrorWithDelay('test error')
      .pipe(
        catchError((error) => {
          const end = Date.now();
          expect(error.message).toBe('test error');
          expect(end - start).toBeGreaterThanOrEqual(300);
          expect(end - start).toBeLessThanOrEqual(2000);
          done();
          return of();
        })
      )
      .subscribe();
  });
});
