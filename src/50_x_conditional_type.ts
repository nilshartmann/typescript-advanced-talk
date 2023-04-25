export default undefined;

// Beispiel: Funktion mit unterschiedlichen Rückgabe-Werten
//   - Wenn s null ist, soll null zurückgegeben werden
//   - Wenn s string ist, soll string zurückgegeben werden

declare function reverse<S extends string | null>(
  s: S
): S extends string ? string : null;

const l = reverse("Hallo").toUpperCase(); // OK
const x = reverse(null).toUpperCase(); // ERROR: object possibly null

// Der Never Typ...

type AllowedValues = string | boolean | number;

type MyExtract<P, TYPES> = P extends TYPES ? P : never;

type X = MyExtract<AllowedValues, string | number>;
