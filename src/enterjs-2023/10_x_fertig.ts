import { Flatten } from "./flatten";

export default undefined;

declare function createObservable<P extends object>(o: P): Observable<P>

const person = {
  firstname: "Klaus",
  age: 32,
  sayHello() { }
}

type SupportedPropertyTypes = string | number | boolean;

type CallbackFn<V> = (newValue: V) => void

type Observable<O extends object> = {
  [K in keyof O & string as O[K] extends SupportedPropertyTypes ? `on${Capitalize<K>}Change`: never]: (callback: CallbackFn<O[K]>) =>  void
}

// nur zum debuggen
type X = Flatten<Observable<typeof person>>
//   ^? 

const result = createObservable(person);

result.onAgeChange((newAge) => newAge > 3) // OK newAge number
//                   ^? 

result.onFirstnameChange( (newFirstname) => newFirstname.toUpperCase()) // OK newFirstname string
//                   ^? 



