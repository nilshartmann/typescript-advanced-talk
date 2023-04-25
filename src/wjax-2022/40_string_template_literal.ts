export default undefined;

// Beispiel 1: String Template Literal
//
//             A) Ein Typ, der den Namen einer Setter-Funktion zurückliefert
//

type Person = {
  lastname: string;
  firstname: string | null;
  age: number;
};

// Beispiel 2: Builder-Pattern
//
//   Für einen gegebenen Typen soll ein "Builder-Typ" gebaut werden
//    - für alle Eigenschaften set-Funktion
//    - eine Build-Funktion, die den Original-Typen read-only zurückliefert
//
//   Vorgehen:
//    - erst Setter bauen
//    - dann Builder

// TODO!
declare function createBuilder<O>(): O;

const newPerson = createBuilder<Person>()
  .setAge(123)
  .setFirstname(null)
  .setLastname("Meier")
  .build();

newPerson.age = 123; // nope, readonly
const age: string = newPerson.age; // nope, number
const newAge: number = newPerson.age; // fine!

// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types
// https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html
// https://www.typescriptlang.org/docs/handbook/2/conditional-types.html
