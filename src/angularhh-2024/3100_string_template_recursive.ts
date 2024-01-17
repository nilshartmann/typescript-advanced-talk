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
