import { Flatten } from "./flatten";

export default undefined;

// mapped type: Kopie des Objektes, Index Access Operator
//   CallbackFn als Rückgabe-Typ
//   Conditional-Types mit getLength
//   Filtern der Property-Tpyen mit "SupportedPropertyTypes"
//   Umbennen der Keys

declare function getLength<S extends string | null>(s: S): S extends string ? number : null;

type PropertyName<S extends string> = `on${Capitalize<S>}Change`

type MakePositive<S extends string> = S extends `-${infer A}` ? A : true

type A = MakePositive<"-7">

type Cap<X extends string> = X extends "a" ? "A" : X extends "b": "B"

type ChangeFnName<S extends string> = S extends `set${infer A}` ?
  A extends `l` ? "L" : 
  
  `on${Capitalize<A>}Change` : `on${Capitalize<S>}Change`
type C = ChangeFnName<"setlastname">
type ObserverObject<O extends object> = {
  // todo: dokumentieren!
  [K in keyof O as O[K] extends Function ? never : K extends string ? PropertyName<K>: K]: ((callbackFn: (newValue: O[K]) => void) => void)
}

declare function createObservable<P extends object>(o: P): ObserverObject<P>

const person = {
  firstname: "Klaus",
  age: 32,
  setlastname() { }
}


type H = PropertyName<"firstname">

type Person = ObserverObject<typeof person>
//    ^? 

// Das wollen wir dynamisch bauen:
type PersonObservable = {
  onFirstnameChange: ((cn: (newFirstname: string) => void) => void)
  onAgeChange: ((cn: (newAge: number) => void) => void)
  // sayHello nicht vorhanden
}


const result = createObservable(person) ;

result.onAgeChange((newAge) => newAge > 3) // SOLL newAge number
//                   ^? 

result.onFirstnameChange( (newFirstname) => newFirstname.toUpperCase()) // SOLL newFirstname string
//                   ^? 



