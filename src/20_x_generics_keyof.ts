export default undefined;

// BEISPIEL 1: GENERICS
//             Eine Funktion, mit Generic, die ein Objekt selben Types zurückliefert
//             und eine Setter-Funktion (wie React useState)
declare function useState<O>(initialValue: O): [O, (newVlaue: O) => void];

const [s1, setS1] = useState("Hallo");
s1.toUpperCase(); // OK
setS1("gasdfsdf"); // OK
setS1(null); // FEHLER

const [s2, setS2] = useState<string | null>("Hallo");
s2.toUpperCase(); // FEHLER
setS2("gasdfsdf"); // OK
setS2(null); // FEHLER

// BEISPIEL: keyof-Operator

//  TypeScript soll einen Compile-Fehler werfen, wenn beim Aufrufen
//  der Funktion der zweite Parameter (Name des Properties) nicht
//  auf ein in dem Objekt vorhandenes Property zeigt:
//  function getSomething(o, prop) {}
//   getSomething({firstname: "Klaus"}, "firstname") // OK
//   getSomething({firstname: "Klaus"}, "lastname") // ERR, lastname nicht im Objekt vorhanden

function getSomething<O extends object>(o: O, p: keyof O) {
  return o[p];
}

const f: string = getSomething({ firstname: "" }, "firstname");
const n: number = getSomething({ fistname: "", age: 32 }, "age");

getSomething({ firstname: "" }, "lastname"); // ERR
getSomething("klaus", ""); // ERR: klaus not an object

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
