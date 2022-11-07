export default undefined;

// Beispiel: Pattern Matching mit infer von Strings
//
//   - parseUrl soll ein Objekt zurückliefern,
//     In dem die Platzhalter aus der übergebenen URLs als Keys und die Werte als Strings enthalten sind
//
// - Segments type => wie eine rekursive Funktion, in der wir eine Liste für das Ergebnis übergeben

const path = "/api/v1/:userId/likes/:likeId";

// Erwarteter Ziel-Typ:
// {
//   userId: string;
//   likeId: string;
// }

declare function parseUrl<S extends string>(url: S): any;

const r = parseUrl(path);
r.likeId; // OK
r.personId; // ERROR
