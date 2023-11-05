import { Flatten } from "./flatten";

export default undefined;

// Beispiel: Pattern Matching mit infer von Strings
//
//   - parseUrl soll ein Objekt zurückliefern,
//     In dem die Platzhalter aus der übergebenen URLs als Keys und die Werte als Strings enthalten sind
//
// - Segments type => wie eine rekursive Funktion, in der wir eine Liste für das Ergebnis übergeben

const path = "/api/v1/:userId/likes/:likeId";

type GetArgument<A extends string> = A extends `:${infer ARG}` ? ARG : never;

type Segments<
  URL extends string,
  RESULT extends string[] = []
> = URL extends `${infer L}/${infer R}`
  ? Segments<R, [...RESULT, GetArgument<L>]>
  : [...RESULT, GetArgument<URL>];

type ArrayToUnion<X extends any[]> = X[number];
type UnionToObject<S extends string> = {
  [Name in S]: string;
};
type UrlParams<S extends string> = Flatten<UnionToObject<ArrayToUnion<Segments<S>>>>;

// Erwarteter Ziel-Typ:
// {
//   userId: string;
//   likeId: string;
// }

declare function parseUrl<S extends string>(url: S): UrlParams<S>;

const r = parseUrl(path);
r.likeId; // OK
r.userId.toLowerCase(); // OK
r.personId; // ERROR

// Schritt 2:
// - Eine 'requestHandleFunction', die zwei Parameter hat:
//    - URL
//    - handler-Callback-Funktion
//      Die Handler-Funktion bekommt die geparsten Argumente typsicher übergbeen
type RequestHandleFn<URL extends string> = (args: UrlParams<URL>) => void;
declare function onGetRequest<URL extends string>(url: URL, handle: RequestHandleFn<URL>): any;

onGetRequest(path, args => {
  args.likeId; // OK
  args.userId.toLowerCase(); // OK
  args.personId; // ERROR Property 'personId' does not exist
});
