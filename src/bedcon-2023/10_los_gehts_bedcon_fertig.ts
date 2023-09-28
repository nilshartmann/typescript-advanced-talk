export default undefined;

// https://zod.dev/


// TypeScript zieht aus  JS-LAUFZEIT Verhalten Rückschlüsse auf das
// Typsystem

type Person = {
  address: string;
}

type Address = {
  email: string;
  city: string
  plz: string;
}

sendLetterTo(
  {
    // @ts-ignore
  faslfasldf: ""
  })

function fail(): never {
    throw new Error("...")
  }

function sendLetterTo(p: Person | Address | string | null) {
  
  if (p === null) {
    fail();
  }

  if (typeof p === "string") {
    return p.toLowerCase();
  }

  if (isPerson(p)) { // Type Guard
    return p.address;
  }
  
  return p.city;

}
 
function isPerson(p: object): p is Person {
  return "address" in p
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

