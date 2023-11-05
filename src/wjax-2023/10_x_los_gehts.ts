export default undefined;

// TypeScript zieht aus  JS-LAUFZEIT Verhalten Rückschlüsse auf das
// Typsystem
// Wie kommen wir 

type Person = {
  address: string;
}

type Address = {
  city: string
  plz: string;
}


function sendLetterTo(p: Person | Address | null |string) { 

  if (!p) {
    fail();
  }

  if (typeof p === "string") {
    return `Send to ${p}`;
  }


  if ("address" in p) {
    return p.address;
  }

  return `${p.plz} ${p.city}`;
}

function fail(): never {
  throw new Error("...");
}


// wie kommen wir an 'address'
// 
type Company = {
  name: string
  address: {
    city: string;
    plz: string;
  }
}

type CompanyAddress = Company["address"];

