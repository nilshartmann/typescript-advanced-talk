import { Equal, Expect, IsNever } from "type-testing";
import { expectTypeOf } from "vitest";
import { Flatten } from "./flatten";

export default undefined;

// TODO:
//  - GetParam Type, der prüft, ob ein String mit ":" anfängt und sonst never zurückliefert
//  - type ParsedUrl<U extends string, SEGMENTS extends string[] = []> = unknown;
//    // Rekursiv verwenden, RIGHT mit Parsed Url
//
//
// getParams soll ein Objekt zurückliefern, dass für jeden
// Platzhalter in der URL einen Eintrag enthält
//   - Der Name soll jeweils den Platzhaltern (ohne ":") entsprechen
//   - Der Typ soll jeweils "string" sein (in der URL sind nur strings)

const path = "/api/v1/:userId/likes/:likeId";

type ParamName<S extends string> = S extends `:${infer ARG}` ? ARG : never;

type X = ParamName<":userId">;

type ParseUrl<
  S extends string,
  RESULT extends string[] = []
> = S extends `${infer L}/${infer R}`
  ? ParseUrl<R, [...RESULT, ParamName<L>]>
  : [...RESULT, ParamName<S>];

type Y = ParseUrl<typeof path>;
type Params = Y[number];

type UrlObject<K extends string> = {
  [Key in K]: string;
};

type MyUrl = UrlObject<Params>;

type MakeParams<URL extends string> = unknown;

declare function getParams<URL extends string>(path: URL): MakeParams<URL>;

const result = getParams(path);

// für Pfad "/api/v1/U1/likes/L1"
// ...sollte das rauskommen:

const expectedResult = {
  userId: "U1",
  likeId: "L1",
};

// ...und als Typ:
type ExpectedPathParams = {
  userId: string;
  likeId: string;
};
