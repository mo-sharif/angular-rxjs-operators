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
  timer
} from "rxjs";
import { tap, defaultIfEmpty } from "rxjs/operators";

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

  // Creation pipeable operators
  _of(item) {
    const op = of(item);
    this.handleResults(op);
  }

  _from(item) {
    const op = from(item);
    this.handleResults(op);
  }

  _interval(item: number) {
    const op = interval(item);
    this.handleResults(op);
  }

  _iif(condition) {
    const op = iif(() => condition, this.lightTheme$, this.darkTheme$);
    this.handleResults(op);
  }

  _defer(condition) {
    const op = defer(() => (condition ? this.lightTheme$ : this.darkTheme$));
    this.handleResults(op);
  }

  _defaultIfEmpty(condition) {
    const op = of().pipe(defaultIfEmpty(condition));
    this.handleResults(op);
  }

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

  handleResults(op: Observable<any>) {
    this.listener = op.pipe(tap(r => console.log(r))).subscribe();
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
