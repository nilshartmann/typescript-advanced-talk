export default undefined;

// TODO:
//   - "naiver" Weg: string | null als Rückgabe-Wert
//   - Generic für Funktion
//   - Beispiel für Conditional Type
//   - Conditional Type verwenden

/**
 * Diese Funktion kann einen string oder null entgegen nehmen
 *
 * - ist value ein String, wird dessen Länge zurückgegeben (=> number)
 * - ist value null, soll null zurückgegeben werden (=> null)
 */

declare function getLength<S extends string | null>(
  value: S
): S extends string ? number : null;

// const a = condition ? "...":  "..."

let x = getLength("hello");
let y = getLength(null);
