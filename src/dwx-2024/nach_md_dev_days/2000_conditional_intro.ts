export default undefined;

// TODO:
//   - "naiver" Weg: string | null als Rückgabe-Wert
//   - Generic für Funktion
//   - Beispiel für Conditional Type
//   - Conditional Type verwenden
//   - Weitere Beispiel mit Rekursion (NumberOrStringOrNull)

/**
 * Diese Funktion kann einen string oder null entgegen nehmen
 *
 * - ist value ein String, wird dessen Länge zurückgegeben (=> number)
 * - ist value null, soll null zurückgegeben werden (=> null)
 */
declare function getLength<V extends string | null>(
  value: V
): V extends string ? number : null;

const x: number = getLength("mddevdays");
const y: null = getLength(null);

// const a = bedindung ? "a" : "b"
