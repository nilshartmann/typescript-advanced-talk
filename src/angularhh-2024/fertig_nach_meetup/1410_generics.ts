export default undefined;

// Generic Functions
// - useState-Funktion von R****
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// Generic Types
//  - Die Setter-Funktion als Typ

type SetterFn<V> = (newValue: V) => void

declare function
  createSetFn<V>(v: V): SetterFn<V>;


let x = createSetFn<string|number|object>(null)
x("...")
x(123);
//  ^?

let y = createSetFn(666)
//  ^?