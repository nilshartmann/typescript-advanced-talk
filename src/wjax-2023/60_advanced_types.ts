import { Flatten } from "./flatten";

export default undefined;

//
//   - 3. Conditional Type: Wenn im Original eine Funktion, dann besondere Behandlung
//       - Eigenes Beispiel Conditional-Types mit getLength
//       - Bei Funktionen im Mapped Type String "FUNKTION" zurückgeben
//    - 4. Condiontal Type mit Infer
//    - 5. String Template Type
//       - am eigenen Beispiel
//       - infer (am Beispiel Capitalize)
//

// Das wollen wir machen:
declare function createProxy(o: any): any;

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_: string) {
    return true;
  },
};

type PersonProxy = {
  setFirstname: (newFirstname: string) => void;
  setAge: (newAge: number) => void;
  setLastname: (newLastName: string) => void;
};

const result = createProxy(person) as PersonProxy;

result.setAge(32); // SOLL newAge number
result.setFirstname("Klaus"); // SOLL newFirstname string
result.setLastname("Meier"); // SOLL: lastname 'string'
