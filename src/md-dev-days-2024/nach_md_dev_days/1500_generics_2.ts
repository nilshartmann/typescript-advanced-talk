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

// type Person = { firstname: string }
// type Firstname = Person["firstname"]

person["firstname"];

const firstname = getPropertyFromObject(person, "firstname");
const age = getPropertyFromObject(person, "age");
getPropertyFromObject(person, "city"); // ERR: 'city' nicht in dem Objekt
