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


function sendLetterTo(p: any) { }


// wie kommen wir an 'address'
// 
type Company = {
  name: string
  address: {
    city: string;
    plz: string;
  }
}

