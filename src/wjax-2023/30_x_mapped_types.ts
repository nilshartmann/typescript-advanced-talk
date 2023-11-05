import { Flatten } from "./flatten";

export default undefined;
//  Das können wir selbst bauen!
//   - Mapped Type:
//      - Key wird optional
//      - Rückabe-Typ für alle "boolean"

type ValidatedObject<O> = {
  [K in keyof O]: boolean;
};

declare function validate<O extends object>(o: O): ValidatedObject<O>;

const result = validate({
  firstname: "klaus",
  age: 32,
});

result.firstname;
//      ^?
result.age;
//      ^?
