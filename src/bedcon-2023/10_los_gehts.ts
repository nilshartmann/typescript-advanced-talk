import { Flatten } from "./flatten";

export default undefined;

// 
// Schritt 1: "getPropertyFromPerson"
//   mapped type: Kopie des Objektes, Index Access Operator
//   CallbackFn als Rückgabe-Typ
//   Conditional-Types mit getLength
//   Filtern der Property-Tpyen mit "SupportedPropertyTypes"
//   Umbennen der Keys
//   Evtl. rausfiltern von eigenschaften, die nicht mit setXXX anfangen

// Vorbereitung:
// declare function getPropertyFromObject(o: any, p: any): any

// Das wollen wir machen:
declare function createProxy(o: any): any

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_: string)  {return true }
}

type PersonProxy = {
  setFirstname: (newFirstname: string) => void,
  setAge: (newAge: number) => void,
  setLastname: (newLastName: string) => void 
}


const result = createProxy(person) as PersonProxy;

result.setAge(32) // SOLL newAge number
result.setFirstname("Klaus") // SOLL newFirstname string
result.setLastname("Meier"); // SOLL: lastname 'string'



