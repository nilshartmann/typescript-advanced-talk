import { Equal, Expect } from "type-testing";
import { expectTypeOf } from "vitest";

export default undefined;

// Wir vervollständigen die createProxy-Funktion
//  die Keys sollen jetzt `setXyz` heissen
//  (außer Keys, die schon mit setXyz anfangen...)

declare function createProxy<O extends object>(o: O): ProxyObject<O>;

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_newLastname: string) {
    // ...
  },
};

type ExpectedPersonProxy = {
  setFirstname: (newValue: string) => void;
  setAge: (newValue: number) => void;
  setLastname: (newValue: string) => void;
};

type ProxyObject<O extends object> = {
  [K in keyof O & string as K extends `set${string}`
    ? K
    : `set${Capitalize<K>}`]: O[K] extends (a: infer A) => any
    ? (newValue: A) => void
    : (newValue: O[K]) => void;
};

type PP = ProxyObject<typeof person>;

type test_PP = Expect<Equal<ExpectedPersonProxy, PP>>;
expectTypeOf(createProxy(person)).toEqualTypeOf<ExpectedPersonProxy>();
