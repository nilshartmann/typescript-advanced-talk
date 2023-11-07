export default undefined;

//  - Werkzeuge für die nächsten Schritte:
//   - Union Type string
//   - String vs. Value
//
//   - Index Access Operator (Beispiel: 'address' Company)

const Cloading = "loading";
const Cfailed = "failed";

type Loading = typeof Cloading;
type Failed = typeof Cfailed;

type RequestState = Loading | Failed;

declare function setRequestState(
  state: RequestState): void;

declare function loadFromServer(): string;

const x = loadFromServer();
assertRequestState(x);
x
const y = x as RequestState;

// Zod 

if (x === Cloading || x === Cfailed) { // Type Guard
  setRequestState(x)
}

if (isRequestState(x)) {
  
}


// Type Predicate Function
function isRequestState(a: any): a is RequestState {
  return a === Cloading || a === Cfailed;
}  

function assertRequestState(a: string): asserts a is RequestState {
  if (a === "loading" || a === "failed") {
    return;
  }

  throw new Error("...");
} 

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

// Index Access Operator
type Address = Company["address"]

declare function sendLetter(a: Address): void




