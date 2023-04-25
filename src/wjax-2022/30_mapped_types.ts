export default undefined;
// type P1 = keyof Person; // name | age
// type X = Person[name] // string

type Person = {
  id: string;
  name: string;
  age: number;
};

/// -----------------------------------------------------------------------------------------
//  BEISPIEL: mapped-Type
//
//  Wir haben eine generische validate-Funktion, die ein Objekt entgegen nimmt,
//     und das Ergebnis der Validierung (true/false) pro Feld zurückgibt

declare function validate<O>(object: O): any;

const person = {
  lastname: "Mueller",
  city: "Hamburg",
};
const result = validate(person);

// @ts-ignore   🤔🤔🤔🤔🤔🤔🤔
const validLastname: boolean = result.lastname;

// @ts-ignore   🤔🤔🤔🤔🤔🤔🤔
const validCity: boolean = result.city;

// -----------------------------------------------------------------------------------------
//
// BEISPIEL: UTILITY TYPE #1
//
function patchPerson(person: Person) {
  // Wir wollen eine Untermenge von Person erlauben...
  // außerdem sollte person readonly sein
}

//
