import { Injectable } from "@angular/core";
import {
  BehaviorSubject,
  Observable,
  Subject,
  from,
  of,
  fromEvent,
  defer,
  interval,
  Subscription,
  iif,
  combineLatest,
  timer,
  concat,
  merge,
  throwError
} from "rxjs";
import {
  tap,
  defaultIfEmpty,
  delay,
  startWith,
  withLatestFrom,
  map,
  catchError,
  mergeMap,
  retry,
  debounce,
  debounceTime,
  mapTo,
  switchMap,
  distinctUntilChanged,
  take,
  takeUntil,
  scan,
  shareReplay
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";

@Injectable()
export default class DataService {
  // BehaviorSubject
  results = new BehaviorSubject(of());

  // Observable
  results$: Observable<any>;

  // Subscription
  listener: Subscription;

  //Observables return css class names
  lightTheme$: Observable<any> = of("lightTheme");
  darkTheme$: Observable<any> = of("darkTheme");

  launchObservables: Observable<string>[] = [
    of("3️⃣").pipe(delay(800)),
    of("2️⃣").pipe(delay(700)),
    of("1️⃣").pipe(delay(600)),
    of("🚀").pipe(delay(500)),
    of("💨").pipe(delay(400))
  ];

  getTodosFromApi$ = this.http.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  constructor(private http: HttpClient) {}

  // Creation operators
  _from(item) {
    const op = from(item);
    this.handleResults(op);
  }

  _of(item) {
    const op = of(item);
    this.handleResults(op);
  }

  _interval(item: number) {
    const op = interval(item);
    this.handleResults(op);
  }

  _defer(condition) {
    const op = defer(() => (condition ? this.lightTheme$ : this.darkTheme$));
    this.handleResults(op);
  }

  _iif(condition) {
    const op = iif(() => condition, this.lightTheme$, this.darkTheme$);
    this.handleResults(op);
  }

  _defaultIfEmpty(condition) {
    const op = of().pipe(defaultIfEmpty(condition));
    this.handleResults(op);
  }
  // Combination operators
  _combineLatest(condition) {
    const intervalOne$ = interval(1000);
    const intervalTwo$ = interval(2000);
    const intervalThree$ = interval(3000);

    const op = combineLatest(
      intervalOne$,
      intervalTwo$,
      intervalThree$,
      // combineLatest also takes an optional projection function
      (one, two, three) => {
        return `⏱ ${one} | ⏱ ${two} | ⏱ ${three}`;
      }
    );
    this.handleResults(op);
  }

  _concat() {
    const op = concat(...this.launchObservables);
    this.handleResults(op);
  }

  _merge() {
    const op = merge(...this.launchObservables);
    this.handleResults(op);
  }

  _startWith(emojis) {
    const op = from(emojis).pipe(startWith("💩"));
    this.handleResults(op);
  }

  _withLatestFrom(emojis) {
    const user$ = of("🌵");
    const users$ = of(emojis);

    const op = users$.pipe(
      withLatestFrom(user$),
      map(([users, user]) => `User ${user} Users ${users}`)
    );
    this.handleResults(op);
  }
  _catchError(errorMsg) {
    const observableWithError$ = of().pipe(throwError);

    const op = observableWithError$.pipe(catchError(() => of(errorMsg)));
    this.handleResults(op);
  }

  _retry(times) {
    const interval$ = interval(500);

    const op = interval$.pipe(
      mergeMap(val => {
        //throw error for demonstration
        if (val > 2) {
          return throwError("Error 💩");
        }
        return of(val);
      }),
      //retry 2 times on error
      retry(times)
    );
    this.handleResults(op);
  }

  _handleInputChange(value) {
    const op = of(value);
    this.handleResults(op);
  }

  _distinctUntilChanged(emojis) {
    const op = from(emojis).pipe(distinctUntilChanged());
    this.handleResults(op);
  }

  _take(emojis, times) {
    const op = from(emojis).pipe(take(times));
    this.handleResults(op);
  }

  _takeUntil() {
    //emit value every 300ms
    const source = interval(300);
    //after 2 seconds, emit value
    const timer$ = timer(2000);
    //when timer emits after 2s, complete source
    const op = source.pipe(takeUntil(timer$));
    this.handleResults(op);
  }

  // Transformation
  _map(emojis) {
    const op = from(emojis).pipe(map(res => res + "✅"));
    this.handleResults(op);
  }

  _mapTo(mapToItem) {
    const op = interval(1000).pipe(mapTo(mapToItem));
    this.handleResults(op);
  }

  _scan(emojis) {
    const op = from(emojis).pipe(scan((all, cur) => [cur, ...all], []));
    this.handleResults(op);
  }

  _switchMap(emojis) {
    const op = of(emojis).pipe(
      switchMap((item: string) => of(["🚗", "⚽️", "🍻"]))
    );
    this.handleResults(op);
  }

  _tap(emojis) {
    const op = of(emojis).pipe(tap(() => console.log("👋")));
    this.handleResults(op);
  }

  _toPromise(emojis) {
    const op = of(emojis)
      .toPromise()
      // output emojis
      .then(result => {
        console.log("From Promise:", result);
      });
  }

  handleResults(op: Observable<any>) {
    this.listener = op.pipe(tap(res => console.log(res))).subscribe();
    // store operation Observable to render results for the UI
    this.results$ = op;
  }

  // unsubscribe from Subscription
  unsubscribe() {
    this.listener.unsubscribe();
    // reset observable
    this.results$ = null;
  }
}
