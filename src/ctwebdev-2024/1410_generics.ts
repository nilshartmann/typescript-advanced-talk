export default undefined;

// Generic Functions
// - useState-Funktion von React
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// Generic Types
//  - Die Setter-Funktion als Typ

type SetterFn<VALUE> = (newValue: VALUE | null) => void;

declare function useState<V>(value: V): SetterFn<V>;

let x = useState("hello");
let y = useState(123);
let z = useState<string>(123);
