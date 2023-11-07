export default undefined;
import { Flatten } from "./flatten";

//  - Generics #2
//   - keyof
//   - Constraints


// type Person = {
//   firstname: string;
//   age: number,
//   city: string
// }

// type KeysInPerson = Flatten<keyof Person>;

declare function getPropertyFromObject
  <O extends object,
  P extends keyof O>
  (object: O, key: P): O[P];


const person = { firstname: "Klaus", age: 32 };



const firstname = getPropertyFromObject(person, "firstname");
const age: number = getPropertyFromObject(person, "age");
const city: string = getPropertyFromObject(person, "city"); // ERR: 'city' nicht in dem Objekt
getPropertyFromObject("hamburg", "city");
