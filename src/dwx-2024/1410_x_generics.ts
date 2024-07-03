export default undefined;

// Generic Functions
// - setState-Funktion von React
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// Generic Types
//  - Die Setter-Funktion als Typ

type SetterFunction<S> = (newValue: S) => void;

declare function useState<O>(o: O): [O, SetterFunction<O>];
