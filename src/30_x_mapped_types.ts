export default undefined;
// [P in keyof OBJECT]
// type P1 = keyof Person; // name | age
// type X = Person[name] // string

type Person = {
  id: string;
  name: string;
  age: number;
  hobby: string;
};

// -----------------------------------------------------------------------------------------
//  BEISPIEL: mapped-Type
//
//  Wir haben eine generische validate-Funktion, die ein Objekt entgegen nimmt,
//     und das Ergebnis der Validierung (true/false) pro Feld zurückgibt

type Validated<O> = {
  [k in keyof O]: boolean;
};

declare function validate<O extends object>(object: O): Validated<O>;

const person = {
  lastame: "Mueller",
  city: "Hamburg",
};
const result = validate(person);

// -----------------------------------------------------------------------------------------
//
// BEISPIEL: UTILITY TYPE #1
//
async function patchPerson(p: Readonly<Partial<Person>>) {
  // modifying the object is now forbidden:
  // p.age = 99;  // ERROR

  // send this to our REST API...
  await fetch("/api/person", {
    method: "PATCH",
    body: JSON.stringify(p),
  });
}

const klaus = {
  id: "1",
  name: "Klaus",
  age: 34,
  hobby: "TypeScript!",
};

patchPerson(klaus); // OK - all required props set

const susi = {
  id: "123",
  age: 34,
};
patchPerson(susi); // OK: patchPerson expects partial type
