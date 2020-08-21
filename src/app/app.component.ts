import { AfterViewInit, Component, ViewChild, ElementRef } from "@angular/core";
import DataService from "./data.service";
import { Observable, fromEvent } from "rxjs";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  @ViewChild("input", { static: true }) inputRef: ElementRef;

  trees = ["🌴", "🌲", "🌳", "🎄"];
  emojis = ["👍", "🦄", "💩"];
  inputData = this.trees;
  strInputData = JSON.stringify(this.inputData);
  items = [
    {
      action: () => this.dataService._from(this.inputData),
      category: "Creation functions",
      code: `from(${this.strInputData})`,
      desc: "Turn an array, promise, or iterable into an observable",
      name: "from(...)"
    },
    {
      action: () => this.dataService._interval(1000),
      code: `interval(1000)`,
      desc: "Emit numbers in sequence based on provided timeframe.",
      name: "interval(...)"
    },
    {
      action: () => this.dataService._of(this.inputData),
      code: `of(${this.strInputData})`,
      desc: "Emit a sequence of an object, array, and function",
      name: "of(...)"
    },
    {
      // condition hardcodede to false
      action: () => this.dataService._defer(false),
      code: `defer(
    condition: () => boolean ?
        observable1$:
        observable2$
      )`,
      desc: "Subscribe to first or second observable based on a condition",
      name: "defer(...)",
      link:
        "https://medium.com/javascript-everyday/rxjs-iif-is-not-the-same-as-defer-with-ternary-operator-7cb012903fe7"
    },
    {
      // condition hardcodede to false
      action: () => this.dataService._iif(false),
      category: "Conditional functions",
      code: `iif(
    condition: () => boolean,
        observable1$,
        observable2$,
      )`,
      desc: "Subscribe to first or second observable based on a condition",
      name: "iif(...)"
    },
    {
      action: () => this.dataService._defaultIfEmpty("Empty 🤔"),
      code: `of().pipe(defaultIfEmpty('Empty 🤔'))`,
      desc: "Emit given value if nothing is emitted before completion",
      name: "defaultIfEmpty(...)"
    },
    {
      action: () => this.dataService._combineLatest("Empty 🤔"),
      code: `combineLatest(ob1$, ob2$, ob3$ ...)`,
      desc:
        "When any observable emits a value, emit the last emitted value from each",
      name: "combineLatest(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest"
    },
    {
      action: () => this.dataService._concat("Empty 🤔"),
      code: `concat(ob1$, ob2$, ob3$ ...)`,
      desc: "Subscribe to observables in order as previous completes",
      name: "concat(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/combination/concat"
    },
    {
      action: () => this.dataService._merge("Empty 🤔"),
      code: `merge(ob1$, ob2$, ob3$ ...)`,
      desc: "Turn multiple observables into a single observable",
      name: "merge(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/combination/merge"
    },
    {
      action: () => this.dataService._startWith("Empty 🤔"),
      code: `startWith(ob1$, ob2$, ob3$ ...)`,
      desc:
        "Emit given value first",
      name: "startWith(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/combination/startwith"
    },
    {
      action: () => this.dataService._withLatestFrom("Empty 🤔"),
      code: `withLatestFrom(ob1$, ob2$, ob3$ ...)`,
      desc:
        "provide the last value from another observable",
      name: "withLatestFrom(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/combination/withlatestfrom"
    }
  ];
  constructor(public dataService: DataService) {}
}
