import { Equal, Expect } from "type-testing";
import { expectTypeOf } from "vitest";
import { Flatten } from "./flatten.ts";
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

type SetterFunctionName<Key extends string> = Key extends `set${infer X}`
  ? Key
  : `set${Capitalize<Key>}`;

type MakeProxy<O extends object> = {
  [Key in keyof O & string as SetterFunctionName<Key>]: (
    newValue: O[Key] extends (a: infer ARG) => any ? ARG : O[Key]
  ) => void;
};

declare function createProxy<O extends object>(o: O): Flatten<MakeProxy<O>>;

type World = "world";
type HelloWorld = `Hello, ${Capitalize<World>}`;

const World = `world`;
const HelloWorld = `Hello, ${World.toUpperCase()}`;

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname: function (_newLastname: boolean | null) {
    // ...
  },
};

const y = createProxy(person);

// der Typ folgende muss entstehen:
type ExpectedPersonProxy = {
  setFirstname: (newValue: string) => void;
  setAge: (newValue: number) => void;
  setLastname: (newValue: string) => void;
};
