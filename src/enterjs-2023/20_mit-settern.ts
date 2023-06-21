import { Flatten } from "./flatten";

export default undefined;

declare function createObservable<P extends object>(o: P): Observable<P>

const person = {
  firstname: "Klaus",
  age: 32,

  // "Setter-Funktion"
  // hier soll die onChange-Funktion vom Typ des Arguments (l) sein
  setLastname(l: string) { }
}

// vereinfacht!
type SupportedPropertyTypes = string | number | boolean | Function;

type CallbackFn<V> = (newValue: V) => void

type OnChangeFn<V> = (callback: CallbackFn<V>) => void
  

type Observable<O extends object> = {
  [K in keyof O & string as O[K] extends SupportedPropertyTypes ? `on${Capitalize<K>}Change`: never]: OnChangeFn<O[K]>
}

// nur zum debuggen
type X = Flatten<Observable<typeof person>>
//   ^? 

const result = createObservable(person);

result.onAgeChange((newAge) => newAge > 3) // OK newAge number
//                   ^? 

result.onFirstnameChange( (newFirstname) => newFirstname.toUpperCase()) // OK newFirstname string
//                   ^? 


result.onSetLastnameChange(newLastname => newLastname.toUpperCase()); // OK newLastname string

