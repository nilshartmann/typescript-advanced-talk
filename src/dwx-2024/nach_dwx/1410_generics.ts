export default undefined;

// Generic Functions
// - useState-Funktion von React
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// Generic Types
//  - Die Setter-Funktion als Typ
type SetterFn<V> = (newValue: V) => void;
declare function useState<V>(value: V): [V, SetterFn<V>];

let result = useState<string | number>(123);
