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

type SetterFnName<S extends string> = `set${Capitalize<S>}`;

type A = SetterFnName<"firstname">;

type MakeProxy<O extends object> = {
  [Key in keyof O & string as SetterFnName<Key>]: O[Key] extends (
    a: infer ARG
  ) => any
    ? (newArg: ARG) => void
    : (newValue: O[Key]) => void;
};

declare function createProxy<O extends object>(o: O): MakeProxy<O>;

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_newLastname: boolean) {
    // ...
  },
};

const personProxy = createProxy(person);
personProxy.setAge;

type PersonProxy = MakeProxy<typeof person>;

// der Typ folgende muss entstehen:
type ExpectedPersonProxy = {
  setFirstname: (newValue: string) => void;
  setAge: (newValue: number) => void;
  setLastname: (newValue: string) => void;
};

type X = MakeProxy<ExpectedPersonProxy>;
