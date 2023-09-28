export  type Flatten<P> = {
  [K in keyof P]: P[K]
} & {}

// https://github.com/microsoft/TypeScript/issues/31940#issuecomment-1555533360
type Alias<t> = t & { _: never };


// Mein Ansatz
export type ZodAlias<O, T extends keyof O = keyof O> = {
  [P in T]: O[P];
};