import { Flatten } from "./flatten";

export default undefined;

declare function createObservable<P extends object>(o: P): Observable<P>

const person = {
  firstname: "Klaus",
  age: 32,

  // "Setter-Funktion"
  setLastname(l: string) { }
}

// vereinfacht!
type SupportedPropertyTypes = string | number | boolean | Function;

type CallbackFn<V> = (newValue: V) => void

type OnChangeFn<V> = V extends (x: infer ARG) => void ? 
  (callback: CallbackFn<ARG>) => void
  :
  (callback: CallbackFn<V>) => void

type ChangePropertyName<S extends string> =
  S extends `set${infer PROP_NAME}` ? `on${PROP_NAME}Change` : 
  `on${Capitalize<S>}Change`

type Observable<O extends object> = {
  [K in keyof O & string as O[K] extends SupportedPropertyTypes ? ChangePropertyName<K>: never]: OnChangeFn<O[K]>
}

// nur zum debuggen
type X = Flatten<Observable<typeof person>>
//   ^? 

const result = createObservable(person);

result.onAgeChange((newAge) => newAge > 3) // OK newAge number
//                   ^? 

result.onFirstnameChange( (newFirstname) => newFirstname.toUpperCase()) // OK newFirstname string
//                   ^? 


result.onLastnameChange(newLastname => newLastname.toUpperCase()); // OK newLastname string

