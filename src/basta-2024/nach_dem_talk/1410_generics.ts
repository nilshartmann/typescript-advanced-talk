export default undefined;

// Generic Functions
// - useState-Funktion von React
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// Generic Types
//  - Die Setter-Funktion als Typ

type SetterFn<S> = (newValue: S) => void;

declare function useState<S>(value: S): [S, SetterFn<S | null>];

let x = useState(123);
