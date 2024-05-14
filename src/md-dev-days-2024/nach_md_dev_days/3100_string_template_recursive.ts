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

type GetParam<S extends string> = S extends `:${infer A}` ? A : never;

const path = "/api/v1/:userId/likes/:likeId";

type ParseUrl<
  S extends string,
  SEGMENTS extends string[] = []
> = S extends `${infer LEFT}/${infer RIGHT}`
  ? ParseUrl<RIGHT, [...SEGMENTS, GetParam<LEFT>]>
  : [...SEGMENTS, GetParam<S>];

type Y = ParseUrl<"/api/v1/:userId/likes/:likeId">;
type A = Y[number];
type O = {
  [Key in A]: string;
};

declare function getParams<URL extends string>(path: URL): unknown;

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
