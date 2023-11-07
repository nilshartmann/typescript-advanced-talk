export default undefined;

//  - Werkzeuge für die nächsten Schritte:
//   - Union Type string
//   - String vs. Value
//
//   - Index Access Operator (Beispiel: 'address' Company)


declare function setRequestState(state: string): void;

setRequestState("loading"); // OK
setRequestState("failed"); // OK
setRequestState("saving"); // ERR

// Type vs Value

// wie kommen wir an 'address'?

type Company = {
  name: string;
  address: {
    city: string;
    plz: string;
  };
};



