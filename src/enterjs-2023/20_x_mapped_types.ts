export default undefined;

// Wir bauen nun eine abgewandelte validate-Funktion:
//  - die neue Variante soll weiterhin ein Objekt entgegennehmen
//  - NEU: nicht einen einzelnen Wert validieren, sondern das ganze Objekt!
//  - NEU: der Rückgabe-Typ ist ein Objekt mit allen Keys aus dem zu validierenden Objekt,
//         aber jeweils mit true/false als Rückgabewert
//  - (Um die "verify"-Funktionen kümmern wir uns im nächsten Schritt, hier lassen wir
//     die erstmal weg.)

type ValidatedObject<O extends object> = {
  [Key in keyof O]: boolean;
};

declare function validate<O extends object>(o: O): ValidatedObject<O>;

const person = {
  lastname: "Mueller",
  age: 32,
};

const result = validate(person);

result.lastname === true; // OK
//      ^?

result.age === true; // OK
//      ^?

result.age.length > 3; // ERR: Property 'length' does not exist on type 'boolean'
result.firstname === true; // ERR: Property 'firstname' does not exist
