export default undefined;

// BEISPIEL 1: GENERICS
//             Eine Funktion, mit Generic, die ein Objekt selben Types zurückliefert
//             und eine Setter-Funktion (wie React useState)

//  BEISPIEL 2: keyof-Operator
//  TypeScript soll einen Compile-Fehler werfen, wenn beim Aufrufen
//  der Funktion der zweite Parameter (Name des Properties) nicht
//  auf ein in dem Objekt vorhandenes Property zeigt:
//  function getSomething(o, prop) {}
//   getSomething({firstname: "Klaus"}, "firstname") // OK
//   getSomething({firstname: "Klaus"}, "lastname") // ERR, lastname nicht im Objekt vorhanden

// Zusatz:
//  1.  wir schränken wir ein, dass der erste Parameter ein Objekt sein MUSS?
//         (object vs. Record)
//         getSomething("klaus", "firstname"); // ERR = klaus not an object
//  2.  wie sieht der Rückgabetype aus?

// https://www.typescriptlang.org/docs/handbook/2/generics.html
// https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
