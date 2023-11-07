export default undefined;

// Generic Functions
// - setState-Funktion von React
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// Generic Types
//  - Die Setter-Funktion als Typ

type SetterFunction<S> = (newValue: S) => void

declare function useState<S>(a: S):
  SetterFunction<S>;

let r = useState<string | number>("Hallo");
r(123)

