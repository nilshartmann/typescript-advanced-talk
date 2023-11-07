export default undefined;

//  - Werkzeuge für die nächsten Schritte:
//   - Union Type string
//   - String vs. Value
//
//   - Index Access Operator (Beispiel: 'address' Company)


declare function setRequestState(state: "loading" | "failed"): void;

setRequestState("loading"); // OK
setRequestState("failed"); // OK
setRequestState("saving"); // ERR

// Type vs Value
type Loading = "Loading";
const loading = Loading; // ERR

// wie kommen wir an 'address'

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
