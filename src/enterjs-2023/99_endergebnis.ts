export default undefined;

// Wir wollen eine Funktion (validate), die ein Property eines Objektes validieren kann.
//  - Der Funktion werden zwei Parameter übergeben:
//    - Ein Objekt mit zu validierenden Werten
//    - Ein Key aus dem Objekt
//  - Die Funktion liefert true/false zurück, je nachdem, ob der Wert gültig war oder nicht
//  - Die Implementierung der Funktion lassen wir aus, es geht nur um die Typ-Beschreibungen
//    - Der zweite Parameter muss ein gültiger Parameter aus dem Objekt sein



// declare function validate<O extends object, P extends keyof O>(o: O, p: P,
//   verifyFn: (arg: O[P]) => boolean): boolean;

// Mapped Type
//    Utility Type

type ValidationResult<O extends object> = {
  [K in keyof O]: boolean
}

type RetValue<F> = F extends (...arg: any) => infer R ? R : F


type VerificationObject<O extends object> = {
  [K in keyof O & string as ValidationFunctionName<K>]: O[K] extends Function ?
  (arg: RetValue<O[K]>) => boolean
  : (arg: O[K]) => boolean
}



declare function validate<O extends object>
  ( o: O,
    verifications: VerificationObject<O>
    ): ValidationResult<O>;
  
const valueObject = { lastname: "Mueller", age: 32, firstname() { return 123 } }    

type ValidationFunctionName<S extends string> = `verify${Capitalize<S>}`

const verifyObject: VerificationObject<typeof valueObject> = {
  verifyLastname: (value) => value.length > 3,
  verifyAge: (value) => value > 18,
  verifyFirstname: (value ) => value !== null
}

const result = validate(
  valueObject
  ,verifyObject
  )

declare function getLength<S extends string | null>(s: S):
     S extends string ? number : null

// const x = getLength("abd");
// const y = getLength(null);


result.lastname // boolean
result.age; // boolean
result.firstname



// validate({ lastname: "Mueller" }, "firstname"); // ERR: firstname kein gueltiger Key
// validate("Mueller", "lastname"); // ERR: "Mueller" kein Objekt
