import { Flatten } from "./flatten";

export default undefined;

// 
// Schritt 1: "getPropertyFromPerson"
//   mapped type: Kopie des Objektes, Index Access Operator
//   CallbackFn als Rückgabe-Typ
//   Conditional-Types mit getLength
//   Filtern der Property-Tpyen mit "SupportedPropertyTypes"
//   Umbennen der Keys
//   Signatur Callback-Function : (cbfunction: (value: any) => void) => void

// Das wollen wir machen:
declare function getPropertyFromObject(o: any, p: any): any



declare function createProxy<O extends object>(o: O): Proxy<O>

type PropertyNameFromFunction<S extends string> = 
  S extends `set${string}` ? S : `set${Capitalize<S>}`


type Proxy<O extends object> = Flatten<{
  [K in keyof O & string as O[K] extends Function ? PropertyNameFromFunction<K> : `set${Capitalize<K>}`]:
  O[K] extends (a: infer A) => any ? (newValue: A) => void: 
  (newValue: O[K]) => void
}>



const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_: string) { }
}

const r = createProxy(person)
//    ^? 

// // Das wollen wir dynamisch bauen:
// type PersonProxy = {
//   setFirstname: (newFirstname: string) => void,
//   setAge: (newAge: number) => void,
//   setLastname(s: string) => void
// }


// const result = createProxy(person) as PersonProxy;

// result.setAge(32) // SOLL newAge number
// result.setFirstname("Klaus") // SOLL newFirstname string



