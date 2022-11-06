export default undefined;

type IsArg<A extends string> = A extends `:${infer ARG}` ? ARG : never;

type Segments<
  URL extends string,
  RESULT extends string[] = []
> = URL extends `${infer L}/${infer R}`
  ? Segments<R, [...RESULT, IsArg<L>]>
  : [...RESULT, IsArg<URL>];

type ToUnion<P extends any[]> = P[number];

type PathArgs<P extends string> = ToUnion<Segments<P>>;

type ToObject<X extends string> = {
  [Key in X]: string;
};

declare function parsePath<S extends string>(path: S): ToObject<PathArgs<S>>;

const path = "/api/v1/:userId/likes/:likeId";

const r = parsePath(path);
r.likeId; // OK
r.userId.toLowerCase(); // OK
r.personId; // ERROR Property 'personId' does not exist
