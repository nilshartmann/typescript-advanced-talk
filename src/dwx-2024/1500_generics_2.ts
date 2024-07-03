export default undefined;

// Diese Funktion soll einen Wert aus einem Objekt zurückliefern
//  - object soll ein beliebiges OBJEKT sein
//  - key soll daraus ein gültiger Key sein
//  - Der Rückgabe-Typ soll dem Typen des Wertes entsprechen
declare function getPropertyFromObject(object: unknown, key: unknown): unknown;

const person = { firstname: "Klaus", age: 32 };

const firstname: string = getPropertyFromObject(person, "firstname");
const age: number = getPropertyFromObject(person, "age");
getPropertyFromObject(person, "city"); // ERR: 'city' nicht in dem Objekt
