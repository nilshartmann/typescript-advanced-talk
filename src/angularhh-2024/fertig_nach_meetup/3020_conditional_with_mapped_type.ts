import { Equal, Expect } from "type-testing";
import { expectTypeOf } from "vitest";

//
// Schritte
//  - a: infer A  mit MELDUNG!
//  - Fertig machen
//  - Testen mit PersonProxy

// Die createProxy-Funktion bekommt ein Objekt übergeben,
//  sie liefert ein Objekt mit setter-Funktionen zurück
//  - die setter-Funtkionen heissen zunächst wie im Original-Objekt
//  - wenn eine Eigenschaft im Original-Objekt eine Funktion ist, soll deren
//    Paramter gesetzt werden (nicht die Funktion)
//  - (später: umbenennen der Keys)

type SetterNameFn<S extends string> =
  S extends `set${string}`
  ? S :

  `set${Capitalize<S>}`

type x = SetterNameFn<"firstname">
//   ^? 

type MyProxy<O extends object> = {
  [K in keyof O & string as SetterNameFn<K>]: O[K] extends (a: infer ARG) => any? 
  (newValue: ARG) => void
  : O[K] extends boolean ? "BOOLEAN" : (newValue: O[K]) => void
}


declare function createProxy<O extends object>(o: O): MyProxy<O>;

const person = {
  firstname: "Klaus",
  age: 32,
  bistDuBoolean: true,
  setLastname(_newLastname: number|boolean|null) {
    // ...
  },
};
type Person = typeof person;
type C = MyProxy<Person>



// der Typ folgende muss entstehen:
type ExpectedPersonProxy = {
  firstname: (newValue: string) => void;
  age: (newValue: number) => void;
  setLastname: (newValue: string) => void;
};
