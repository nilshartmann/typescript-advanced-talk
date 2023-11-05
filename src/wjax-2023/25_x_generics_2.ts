export default undefined;

// - keyof
//   - Default-Value
//   - Constraints

declare function getPropertyFromObject<O extends object, K extends keyof O>(
  object: O,
  key: K
): O[K];

const firstname: string = getPropertyFromObject({ firstname: "Klaus", age: 32 }, "firstname");
const age: number = getPropertyFromObject({ firstname: "Klaus", age: 32 }, "age");
const city: string = getPropertyFromObject({ firstname: "Klaus", age: 32 }, "city"); // ERR: 'city' nicht in dem Objekt
