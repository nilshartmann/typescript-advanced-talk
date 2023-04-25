export default undefined;
import { ToObject, ToUnion } from "./util-types";

// Beispiel: Pattern Matching mit infer von Strings
//
//   - parseUrl soll ein Objekt zurückliefern,
//     In dem die Platzhalter aus der übergebenen URLs als Keys und die Werte als Strings enthalten sind
//
// - Segments type => wie eine rekursive Funktion, in der wir eine Liste für das Ergebnis übergeben

type IsArg<A extends string> = A extends `:${infer ARG}` ? ARG : never;

type Segments<
  URL extends string,
  RESULT extends string[] = []
> = URL extends `${infer L}/${infer R}`
  ? Segments<R, [...RESULT, IsArg<L>]>
  : [...RESULT, IsArg<URL>];

type UrlArgs<URL extends string> = ToObject<ToUnion<Segments<URL>>>;

declare function parseUrl<S extends string>(path: S): UrlArgs<S>;

const path = "/api/v1/:userId/likes/:likeId";

const r = parseUrl(path);
r.likeId; // OK
r.userId.toLowerCase(); // OK
r.personId; // ERROR Property 'personId' does not exist

// Schritt 2:
// - Eine 'requestHandleFunction', die zwei Parameter hat:
//    - URL
//    - handler-Callback-Funktion
//      Die Handler-Funktion bekommt die geparsten Argumente typsicher übergbeen
type RequestHandleFn<URL extends string> = (args: UrlArgs<URL>) => void;
declare function onGetRequest<URL extends string>(
  url: URL,
  handle: RequestHandleFn<URL>
): any;

onGetRequest(path, (args) => {
  args.likeId; // OK
  args.userId.toLowerCase(); // OK
  args.personId; // ERROR Property 'personId' does not exist
});
