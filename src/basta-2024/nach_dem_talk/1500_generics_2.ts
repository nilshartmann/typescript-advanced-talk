export default undefined;

// Diese Funktion soll einen Wert aus einem Objekt zurückliefern
//  - object soll ein beliebiges OBJEKT sein
//  - key soll daraus ein gültiger Key sein
//  - Der Rückgabe-Typ soll dem Typen des Wertes entsprechen
declare function getPropertyFromObject<O extends object, K extends keyof O>(
  object: O,
  key: K
): O[K];

const person = { firstname: true, age: 32 };
// person["firstname"]

// type Person = typeof person;
// type Keys = keyof Person
// const Yes = "Yes";

const firstname = getPropertyFromObject(person, "firstname");
const age: number = getPropertyFromObject(person, "age");
getPropertyFromObject(person, "city"); // ERR: 'city' nicht in dem Objekt
