import { Flatten } from "./flatten";

export default undefined;

//   - Mapped Type:
//      - 1:1-Kopie des Objektes
//      - Rückabe-Typ für alle "boolean"

type Person = {
  firstname: string;
  age: number,
  city: string
}

type ValidatedKeyname<S extends string> = `validated${Capitalize<S>}`

type X = ValidatedKeyname<"firstname">

// type Y<S extends string> = {
//   [P in S]: string
// }

// type C = Y<"id" | "name">

type ValidatedObject<O extends object> = {
  [K in keyof O & string as ValidatedKeyname<K>]: boolean
}

declare function validate<O extends object>
  (o: O): Flatten<ValidatedObject<O>>;

const result = validate({
  firstname: "Klaus", age: 32
})
