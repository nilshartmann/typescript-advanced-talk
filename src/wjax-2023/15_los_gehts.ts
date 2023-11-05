export default undefined;

//  Intro

//  - Werkzeuge für die nächsten Schritte:
//   - string literal
//     - union type ("pending", "loading", "finished")
//     - Unterschied Typ <-> Wert
//   - Index Access Operator (Beispiel: 'address' Company)
//
//   - typeof
//    - Achtung! typeof gibt's in JavaScript und in TypeScript!

declare function setRequestState(state: string): void;

setRequestState("loading"); // OK
setRequestState("failed"); // OK

// wie kommen wir an 'address'?
//

type Company = {
  name: string;
  address: {
    city: string;
    plz: string;
  };
};

type CompanyWithContacts = {
  name: string;
  contacts: [
    {
      city: string;
      plz: string;
    },
  ];
};

const aCompany = {
  name: "Acme",
  contacts: [
    {
      city: "Hamburg",
      plz: "22359",
    },
  ],
};
