import { AfterViewInit, Component, ViewChild, ElementRef } from "@angular/core";
import DataService from "./data.service";
import { Observable, fromEvent } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { map, debounceTime, distinctUntilChanged, filter } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  trees = ["🌴", "🌲", "🌳", "🎄"];
  emojis = ["👍", "🦄", "💩"];
  inputData = this.trees;
  strInputData = JSON.stringify(this.inputData);
  myForm: FormGroup;

  myInput = new FormControl("");

  items = [
    {
      action: () => this.dataService._from(this.inputData),
      category: "Creation",
      code: `from(${this.strInputData})`,
      desc: "Turn an array, promise, or iterable into an observable",
      name: "from(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/creation/from",
    },
    {
      action: () => this.dataService._interval(1000),
      code: `interval(1000)`,
      desc: "Emit numbers in sequence based on provided timeframe.",
      name: "interval(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/creation/interval",
    },
    {
      action: () => this.dataService._of(this.inputData),
      code: `of(${this.strInputData})`,
      desc: "Emit a sequence of an object, array, and function",
      name: "of(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/creation/of",
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
      link: "https://www.learnrxjs.io/learn-rxjs/operators/creation/defer",
    },
    {
      // condition hardcodede to false
      action: () => this.dataService._iif(false),
      category: "Conditional",
      code: `iif(
    condition: () => boolean,
        observable1$,
        observable2$,
      )`,
      desc: "Subscribe to first or second observable based on a condition",
      name: "iif(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/conditional/iif",
    },
    {
      action: () => this.dataService._defaultIfEmpty("Empty 🤔"),
      code: `of().pipe(defaultIfEmpty('Empty 🤔'))`,
      desc: "Emit given value if nothing is emitted before completion",
      name: "defaultIfEmpty(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/conditional/defaultifempty",
    },
    {
      action: () => this.dataService._combineLatest("Empty 🤔"),
      category: "Combination",
      code: `combineLatest(ob1$, ob2$, ob3$ ...)`,
      desc:
        "When any observable emits a value, emit the last emitted value from each",
      name: "combineLatest(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/combination/combinelatest",
    },
    {
      action: () => this.dataService._concat(),
      code: `concat(ob1$, ob2$, ob3$ ...)`,
      desc:
        "Subscribe to observables in order as previous completes, like transactions at an ATM",
      name: "concat(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/combination/concat",
    },
    {
      action: () => this.dataService._merge(),
      code: `merge(ob1$, ob2$, ob3$ ...)`,
      desc: "Turn multiple observables into a single observable",
      name: "merge(...)",
      link: "https://www.learnrxjs.io/learn-rxjs/operators/combination/merge",
    },
    {
      action: () => this.dataService._startWith(this.inputData),
      code: `from(${this.strInputData}).pipe(startWith("💩"))`,
      desc: "Emit given value first",
      name: "startWith(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/combination/startwith",
    },
    {
      action: () => this.dataService._withLatestFrom(this.inputData),
      code: `withLatestFrom(of("🌵"))`,
      isInput: false,
      desc: "provide the last value from another observable",
      name: "withLatestFrom(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/combination/withlatestfrom",
    },
    {
      action: () => this.dataService._catchError("Error 💩"),
      category: "Error Handling",
      code: `catchError((e) => of("Error 💩"))`,
      desc: "Gracefully handle errors in an observable sequence",
      name: "catchError(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/error_handling/catch",
    },
    {
      action: () => this.dataService._retry(2),
      code: `retry(2)`,
      desc: "Retry an observable sequence a specific number of times should an error occur",
      name: "retry(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retry",
    },
    {
      category: "Filteration",
      code: `debounceTime(500)`,
      isInput: true,
      desc: "Discard emitted values that take less than the specified time between output",
      name: "debounceTime(...)",
      link:
        "https://www.learnrxjs.io/learn-rxjs/operators/error_handling/retry",
    },
  ];
  constructor(public dataService: DataService) {
        this.myForm = new FormGroup({
       myInput: new FormControl()
    });
  }

  ngOnInit() {
    this.myForm.valueChanges.pipe(
      // filter out words with 3 letters or less
      filter(value  => value.myInput.length >= 3),
      // debounceTime 500ms
      debounceTime(500),
      distinctUntilChanged(),
      map(value => this.dataService._handleInputChange(value.myInput))
    ).subscribe()
  }
}
