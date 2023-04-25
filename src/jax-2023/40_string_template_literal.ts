export default undefined;

// Neue Anforderung für die validate-Funktion:
//  - Die Keys im rules-Objekt sollen jeweils "validateKeyname" heißen:
//     lastname -> validateLastname()
//     age -> validateAge()
const person = {
  lastname: "Mueller",
  age() {
    return 32;
  },
};

// Exkurs: string template literal

type RetValue<F extends Function> = F extends (...args: any) => infer RET_VALUE
  ? RET_VALUE
  : never;

type ValidatedObject<O extends object> = {
  [Key in keyof O]: boolean;
};

type RulesObject<O extends object> = {
  [Key in keyof O as Key]: O[Key] extends Function
    ? (value: RetValue<O[Key]>) => boolean
    : (value: O[Key]) => boolean;
};

declare function validate<O extends object>(
  o: O,
  rules: RulesObject<O>
): ValidatedObject<O>;

const personRules: RulesObject<typeof person> = {
  validateAge(a) {
    return a > 18; // OK a is number
    //     ^?
  },

  validateLastname(l) {
    return l.length > 3; // OK l ist string
    //     ^?
  },
};

const result = validate(person, personRules);
// result wie bisher...
