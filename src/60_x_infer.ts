import { ToObject, ToUnion } from "./util-types";

export default undefined;

type IsArg<A extends string> = A extends `:${infer ARG}` ? ARG : never;

type Segments<
  URL extends string,
  RESULT extends string[] = []
> = URL extends `${infer L}/${infer R}`
  ? Segments<R, [...RESULT, IsArg<L>]>
  : [...RESULT, IsArg<URL>];

declare function parsePath<S extends string>(
  path: S
): ToObject<ToUnion<Segments<S>>>;

const path = "/api/v1/:userId/likes/:likeId";

const r = parsePath(path);
r.likeId; // OK
r.userId.toLowerCase(); // OK
r.personId; // ERROR Property 'personId' does not exist
