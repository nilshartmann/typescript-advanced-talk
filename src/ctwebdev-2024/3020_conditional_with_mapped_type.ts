import { Equal, Expect } from "type-testing";
import { expectTypeOf } from "vitest";
import { Flatten } from "./flatten";

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

type MakeProxy<O extends object> = {
  [Key in keyof O & string as SetterFnName<Key>]: O[Key] extends (
    a: infer ARGUMENT
  ) => void
    ? (newValue: ARGUMENT) => boolean
    : (newValue: O[Key]) => void;
};

declare function getName(): string;

type GetNameReturn = ReturnType<typeof getName>;

declare function createProxy<O extends object>(o: O): Flatten<MakeProxy<O>>;

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_newLastname: number | null | boolean) {
    // ...
  },
};

// type ToUpperCase<S extends string> = S extends "a" : "A" ? S extends "b"

const setterFn = (n: string) => `set${n}`;

type SetterFnName<N extends string> = N extends `set${string}`
  ? N
  : `set${Capitalize<N>}`;

type Test = SetterFnName<"lastname">;

const expectedPersonProxy = {
  setFirstname(newValue: string) {},
  setAge(newValue: number) {},
  setLastname(newValue: string) {},
};

const result = createProxy(person);

type ExpectedPersonProxy = {
  setFirstname: (newValue: string) => void;
  setAge: (newValue: number) => void;
  setLastname: (newValue: string) => void;
};
