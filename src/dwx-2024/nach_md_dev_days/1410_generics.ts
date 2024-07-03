export default undefined;

// Generic Functions
// - useState-Funktion von React
//   - Typ Parameter wird übergeben oder abgeleitet
//   - Zurück kommt Parameter-Typ und Setter-Funktion
//
// Generic Types
//  - Die Setter-Funktion als Typ

type SetterFn<O> = (newValue: O) => void;

declare function useState<O extends string | number>(s: O): [O, SetterFn<O>];

const x = useState(true);
