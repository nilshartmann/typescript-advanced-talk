export default undefined;

// Nun wollen wir noch die verify-Funktionen übergeben.
//  Dazu soll die validate-Funktion als zweiten Parameter ("rules") ein Objekt entgegennehmen,
//    das alle Keys aus o enthält, als Wert aber jeweils die verify Funktion

type ValidatedObject<O extends object> = {
  [Key in keyof O]: boolean;
};

declare function validate<O extends object>(
  o: O,
  rules: any
): ValidatedObject<O>;

const person = {
  lastname: "Mueller",
  age: 32,
};

const personRules: any = {
  age(a) {
    return a > 18; // OK a is number
    //     ^?
  },

  lastname(l) {
    return l.length > 3; // OK l ist string
    //     ^?
  },
};

const result = validate(person, personRules);
// result wie bisher...
