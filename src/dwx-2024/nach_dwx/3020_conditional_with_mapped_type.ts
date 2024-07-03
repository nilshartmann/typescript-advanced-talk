import { Equal, Expect } from "type-testing";
import { expectTypeOf } from "vitest";

//
// Schritte
//  - a: infer A  mit MELDUNG!
//  - Fertig machen

// Die createProxy-Funktion bekommt ein Objekt übergeben,
//  sie liefert ein Objekt mit setter-Funktionen zurück
//  - die setter-Funtkionen heissen zunächst wie im Original-Objekt
//  - wenn eine Eigenschaft im Original-Objekt eine Funktion ist, soll deren
//    Paramter gesetzt werden (nicht die Funktion)
//  - (später: umbenennen der Keys)

declare function createProxy<O extends object>(o: O): MakeProxy<O>;

type SetterFn<S extends string> = S extends `set${string}`
  ? S
  : `set${Capitalize<S>}`;

type SetFirstname = SetterFn<"setLastname">;

type MakeProxy<O extends object> = {
  [K in keyof O & string as SetterFn<K>]: O[K] extends (arg: infer ARG) => any
    ? (newValue: ARG) => void
    : (newValue: O[K]) => void;
};

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_newLastname: string) {
    // ...
  },
};

const result = createProxy(person);
// der Typ folgende muss entstehen:

type ExpectedPersonProxy = {
  setFirstname: (newValue: string) => void;
  setAge: (newValue: number) => void;
  setLastname: (newValue: string) => void;
};
