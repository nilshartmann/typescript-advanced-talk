import { Flatten } from "./flatten";

export default undefined;

// mapped type: Kopie des Objektes, Index Access Operator
//   CallbackFn als Rückgabe-Typ
//   Conditional-Types mit getLength
//   Filtern der Property-Tpyen mit "SupportedPropertyTypes"
//   Umbennen der Keys



declare function createObservable<P extends object>(o: P): unknown

const person = {
  firstname: "Klaus",
  age: 32,
  sayHello() { }
}

// Das wollen wir dynamisch bauen:
type PersonObservable = {
  onFirstnameChange: ((cn: (newFirstname: string) => void) => void)
  onAgeChange: ((cn: (newAge: number) => void) => void)
  // sayHello nicht vorhanden
}


const result = createObservable(person) as PersonObservable;

result.onAgeChange((newAge) => newAge > 3) // SOLL newAge number
//                   ^? 

result.onFirstnameChange( (newFirstname) => newFirstname.toUpperCase()) // SOLL newFirstname string
//                   ^? 



