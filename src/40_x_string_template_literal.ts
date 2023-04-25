export default undefined;

// Beispiel 1: String Template Literal
//
//             Ein Typ, der den Namen einer Setter-Funktion zurückliefert
//             Ein Typ, der die Liste aller Setter-Funktionen zurückliefert
//

type SetterFunctionName<PROPERTY_NAME extends string> =
  `set${Capitalize<PROPERTY_NAME>}`;

// Beispiel:
type SetFirstname = SetterFunctionName<"firstname">;

type Person = {
  lastname: string;
  firstname: string | null;
  age: number;
};

type SetterFunctions = SetterFunctionName<keyof Person>;

const setLastname: SetterFunctions = "setLastname"; // OK
const setCity: SetterFunctions = "setCity"; // ERROR

// Beispiel 2: Builder-Pattern
//
//   Für einen gegebenen Typen soll ein "Builder-Typ" gebaut werden
//    - für alle Eigenschaften set-Funktion
//    - eine Build-Funktion, die den Original-Typen read-only zurückliefert

type Setter<Type> = {
  // "as" ist hier ein Typecast 🤯
  [key in keyof Type & string as SetterFunctionName<key>]: (
    newValue: Type[key]
  ) => Builder<Type>;
};

type Builder<Type> = Setter<Type> & {
  build(): Readonly<Type>;
};

declare function createBuilder<O>(): Builder<O>;

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
