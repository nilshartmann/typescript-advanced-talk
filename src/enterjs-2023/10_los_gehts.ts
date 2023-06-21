import { Flatten } from "./flatten";

export default undefined;

// mapped type: Kopie des Objektes, Index Access Operator
//   CallbackFn als Rückgabe-Typ
//   Conditional-Types mit getLength
//   Filtern der Property-Tpyen mit "SupportedPropertyTypes"
//   Umbennen der Keys

declare function createObservable<P extends object>(o: P): Observable<P>

const person = {
  firstname: "Klaus",
  age: 32,
  sayHello() { }
}

const result = createObservable(person);

result.onAgeChange((newAge) => newAge > 3) // SOLL newAge number
//                   ^? 

result.onFirstnameChange( (newFirstname) => newFirstname.toUpperCase()) // SOLL newFirstname string
//                   ^? 



