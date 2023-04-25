export type ToUnion<P extends any[]> = P[number];

export type ToObject<X extends string> = {
  [Key in X]: string;
};
