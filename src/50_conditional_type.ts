export default undefined;

// Beispiel 1: was macht eigentlich 'Extract' im vorherigen Beispiel?

type AllowedValues = string | boolean | number;

// Beispiel 2: Funktion mit unterschiedlichen Rückgabe-Werten
//
//   - Wenn s null ist, soll null zurückgegeben werden
//   - Wenn s string ist, soll string zurückgegeben werden

declare function reverse<S extends string | null>(s: S): any;

const l = reverse("Hallo"); // 🤔 Rückgabe Typ ?
const x = reverse(null); // // 🤔 Rückgabe Typ ?
