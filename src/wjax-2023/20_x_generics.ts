export default undefined;

// Generics
// - setState-Funktion von React
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// - indexof
//   - Typ Parameter
//   - Default-Value
//   - Constraints

type SetterFunction<S> = (newValue: S) => void;

declare function setState<O>(o: O): [O, SetterFunction<O>];
