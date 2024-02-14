export default undefined;

// TODO:
//   - "naiver" Weg: string | null als Rückgabe-Wert
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

declare function getLength<S extends string | null | boolean>(
  value: S
): S extends string ? number : S extends boolean ? "..." : null;

let x = getLength("Hallo");
let y = getLength(null);
