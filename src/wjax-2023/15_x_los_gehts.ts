export default undefined;

// Intro:
//  - Werkzeuge für die nächsten Schritte:
//   - typeof
//    - Achtung! typeof gibt's in JavaScript und in TypeScript!
//   - Index Access Operator (Beispiel: 'address' Company)

// wie kommen wir an 'address'
//

declare function setRequestState(state: "loading" | "failed"): void;

setRequestState("loading"); // OK
setRequestState("failed"); // OK

type Company = {
  name: string;
  address: {
    city: string;
    plz: string;
  };
};

type CompanyAddress = Company["address"];

type CompanyWithContacts = {
  name: string;
  contacts: [
    {
      city: string;
      plz: string;
    }
  ];
};

type Contact = CompanyWithContacts["contacts"][number];

const aCompany = {
  name: "Acme",
  contacts: [
    {
      city: "Hamburg",
      plz: "22359"
    }
  ]
};

type AContact = (typeof aCompany)["contacts"][number];
