export default undefined;

//  - Generics #2
//   - keyof
//   - Constraints

declare function getPropertyFromObject(object: unknown, key: unknown): unknown;

const person = { firstname: "Klaus", age: 32 };

const firstname: string = getPropertyFromObject(person, "firstname");
const age: number = getPropertyFromObject(person, "age");
const city: string = getPropertyFromObject(person, "city"); // ERR: 'city' nicht in dem Objekt
