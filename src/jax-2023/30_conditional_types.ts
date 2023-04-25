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

declare function getLength(s: any): number | null; // so gehts nicht :()

const l1 = getLength("Klaus"); // number | null, soll aber number sein
//    ^?

const l2 = getLength(null); // number | null, soll aber null sein
//    ^?

// Exkurs: Herleiten von Typen mit Conditional Types
//  Ziel: wir brauchen den Rückgabetyp einer Funktion

// Damit können wir nun RulesObjet anpassen und die Anforderung umsetzen:

type RulesObject<O extends object> = {
  [Key in keyof O]: (value: O[Key]) => boolean;
};

type ValidatedObject<O extends object> = {
  [Key in keyof O]: boolean;
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
