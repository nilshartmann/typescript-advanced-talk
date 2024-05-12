export default undefined;

// Diese Funktion soll einen Wert aus einem Objekt zurückliefern
//  - object soll ein beliebiges OBJEKT sein
//  - key soll daraus ein gültiger Key sein
//  - Der Rückgabe-Typ soll dem Typen des Wertes entsprechen
declare function getPropertyFromObject<O extends object, K extends keyof O>(
  object: O,
  key: K
): O[K];

const firstname: string = getPropertyFromObject(
  { firstname: "Klaus", age: 32 },
  "firstname"
);
const age: number = getPropertyFromObject(
  { firstname: "Klaus", age: 32 },
  "age"
);

// @ts-expect-error
const city: string = getPropertyFromObject(
  { firstname: "Klaus", age: 32 },
  // @ts-expect-error
  "city"
); // ERR: 'city' nicht in dem Objekt
