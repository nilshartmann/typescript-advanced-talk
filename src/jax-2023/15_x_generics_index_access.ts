export default undefined;

// Erweiterung der validate-Funktion:
//  - der dritte Parameter soll nun eine Callback-Funktion sein, die
//    den Wert validiert (verifyFn)
//  - Anforderung:
//      - diese Callback-Funktion soll einen Parameter entgegenen nehmen
//      - der Typ des Parameters muss dem ausgewählten Typ aus dem Objekt entsprechen
//      - der Rückgabe-Typ der funktion soll boolean sein
//

declare function validate<O extends object, P extends keyof O>(
  o: O,
  p: P,
  verifyFn: (value: O[P]) => boolean
): boolean;

validate({ lastname: "Mueller", age: 32 }, "age", (a) => {
  return a > 18; // OK
  //     ^?
});

validate({ lastname: "Mueller", age: 32 }, "lastname", (a) => {
  return a.length > 3; // OK
  //     ^?
});

validate({ lastname: "Mueller", age: 32 }, "age", (a) => {
  return a.length > 3;
}); // ERR: Property 'length' does not exist on type 'number'
