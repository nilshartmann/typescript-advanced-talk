import { Equal, Expect } from "type-testing";
import { expectTypeOf } from "vitest";

export default undefined;

// Wir vervollständigen die createProxy-Funktion
//  die Keys sollen jetzt `setXyz` heissen
//  (außer Keys, die schon mit setXyz anfangen...)

declare function createProxy<O extends object>(o: O): ProxyObject<O>;

type ExpectedPersonProxy = {
  setFirstname: (newValue: string) => void;
  setAge: (newValue: number) => void;
  setLastname: (newValue: string) => void;
};

type SetterName<N extends string> = `set${Capitalize<N>}`;

type BetterSetterName<N extends string> = N extends `set${string}`
  ? N
  : SetterName<N>;

type ProxyObject<O extends object> = {
  [K in keyof O & string as BetterSetterName<K>]: O[K] extends (
    a: infer A
  ) => any
    ? (newValue: A) => void
    : (newValue: O[K]) => void;
};

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(_: string) {
    return true;
  },
};

type PP = ProxyObject<typeof person>;

type test_PP = Expect<Equal<ExpectedPersonProxy, PP>>;
expectTypeOf(createProxy(person)).toEqualTypeOf<ExpectedPersonProxy>();
