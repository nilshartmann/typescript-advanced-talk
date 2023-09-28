import { Flatten } from "./flatten";

export default undefined;

// 
// Schritt 1: "getPropertyFromPerson"
//   mapped type: Kopie des Objektes, Index Access Operator
//   CallbackFn als Rückgabe-Typ
//   Conditional-Types mit getLength
//   never mit assert function bzw. union type
//   Filtern der Property-Tpyen mit "SupportedPropertyTypes"
//   Umbennen der Keys
//   Evtl. rausfiltern von eigenschaften, die nicht mit setXXX anfangen

// Vorbereitung:
// type Person = {
//   firstname: string; age: number;
// }

declare function getPropertyFromObject
  <O extends object, P extends keyof O>(o: O, p: P): O[P]

const p = { firstname: "Klaus", age: 32 }

const x = getPropertyFromObject(p, "age");
getPropertyFromObject("fsdfasfsdf", "firstname");// p["firstname"]




type Proxy<O extends object> = Flatten<{
  [K in keyof O & string as K extends `set${string}` ? K : `set${Capitalize<K>}`]:
  
  O[K] extends (a: infer A) => void ? (newValue: A) => void
:  (newValue: O[K]) => void
}>

// Das wollen wir machen:
declare function createProxy<O extends object>(o: O): Proxy<O>

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(newLastname: number|string|null)  {return true }
}

declare function getLength<X extends string | null>(x: X): 
  X extends string ? number : null

const a = getLength("bedcon");
const b = getLength(null)

const r2 = createProxy(person);
//    ^?


type PersonProxy = {
  setFirstname: (newFirstname: string) => void,
  setAge: (newAge: number) => void,
  setLastname: (newLastName: string) => void 
}


const result = createProxy(person) as PersonProxy;

result.setAge(32) // SOLL newAge number
result.setFirstname("Klaus") // SOLL newFirstname string
result.setLastname("Meier"); // SOLL: lastname 'string'



