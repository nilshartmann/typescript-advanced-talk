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

type ExpectedPathParams = {
  userId: string;
  likeId: string;
};

declare function getParams(s: string): unknown;

// für Pfad "/api/v1/U1/likes/L1"
const expectedResult = {
  userId: "U1",
  likeId: "L1",
};

type GetParam<P extends string> = P extends `:${infer A}` ? A : never;

type ParsedUrl<
  U extends string,
  SEGMENTS extends string[] = []
> = U extends `${infer LEFT}/${infer RIGHT}`
  ? ParsedUrl<RIGHT, [...SEGMENTS, GetParam<LEFT>]>
  : [...SEGMENTS, GetParam<U>];

type ToObject<X extends string> = {
  [Key in X]: string;
};

type UrlObject<U extends string> = ToObject<ParsedUrl<U>[number]>;

type B = UrlObject<"/api/v1/:userId/likes/:likeId">;

type Z = ParsedUrl<typeof path>;
//   ^?

type A = ParsedUrl<typeof path>[number];
//   ^?

type OurPath = UrlObject<typeof path>;
//    ^?
