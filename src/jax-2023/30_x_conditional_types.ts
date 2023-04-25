export default undefined;

// Neue Anforderung für die validate-Funktion:
//  - wenn im Objekt eine FUNKTION enthalten ist, soll deren RÜCKGABE-Wert validiert werden:
const person = {
  lastname: "Mueller",
  age() {
    return 32;
  },
};
// Hier soll also im rules-Objekt weiterhin lastname (string) und age (number) enthalten sein,
// da die age-Funktion eine number zurückliefert.

// - Wir müssen also Prüfen, ob ein Typ einer Bedingung entspricht (Funktion ja/nein) und
//   dann entsprechend unterschiedlich handeln.

// Exkurs: Syntax von Conditional-Types
// Beispiel: getLength-Funktion
//   - Diese Funktion soll 'null' zurückliefern, wenn null übergeben wurde
//   - ansonsten number (Länge des Strings)

declare function getLength<S extends string | null>(
  s: S
): S extends string ? number : null;

const l1 = getLength("Klaus"); // number
//    ^?

const l2 = getLength(null); // number
//    ^?

// Exkurs: Herleiten von Typen mit Conditional Types
//  Ziel: wir brauchen den Rückgabetyp einer Funktion

type RetValue<F extends Function> = F extends (...args: any) => infer RET_VALUE
  ? RET_VALUE
  : never;

type A = RetValue<() => string>; // A ist string
//   ^?
type B = RetValue<() => string | number | null>; // B ist string | number | null
//   ^?

// Damit können wir nun die Anforderung umsetzen:

type ValidatedObject<O extends object> = {
  [Key in keyof O]: boolean;
};

type RulesObject<O extends object> = {
  [Key in keyof O]: O[Key] extends Function
    ? (value: RetValue<O[Key]>) => boolean
    : (value: O[Key]) => boolean;
};

declare function validate<O extends object>(
  o: O,
  rules: RulesObject<O>
): ValidatedObject<O>;

const personRules: RulesObject<typeof person> = {
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
