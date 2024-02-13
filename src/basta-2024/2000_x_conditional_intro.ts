import { expectTypeOf } from "vitest";

export default undefined;

// TODO:
//   - Generic für Funktion
//   - Beispiel für Conditional Type
//   - Conditional Type verwenden
//   - Weitere Beispiel mit Rekursion (NumberOrStringOrNull)

//
//
// - Diese Funktion kann einen string oder null entgegen nehmen
//   - ist value ein String, wird dessen Länge zurückgegeben (=> number)
//   - ist value null, soll null zurückgegeben werden (=> null)
//

type NumberOrNull<O> = O extends string ? number : null;

type S = NumberOrNull<"huhu">; // N = number
type N = NumberOrNull<123>; // N = null
type A = NumberOrNull<true>; // A = null

// getLength mit Conditionals:
declare function getLength<O extends string | null>(
  value: O
): O extends string ? number : null;

const a = getLength("123"); // a: number
//    ^?
const b = getLength(null); // b: null
//    ^?

expectTypeOf(b).toEqualTypeOf(null);
expectTypeOf(a).toEqualTypeOf<number>();

// Anderes Beispiel
type IsPerson<O> = O extends { firstname: string; lastname: string }
  ? true
  : false;

// Rekursive Aufrufe
type NumberOrStringOrNull<O> = O extends string
  ? number
  : O extends boolean
  ? string
  : null;

type T1 = NumberOrStringOrNull<"huhu">; // T1 = string
type T2 = NumberOrStringOrNull<123>; // T2 = null
type T3 = NumberOrStringOrNull<true>; // T3 = string
