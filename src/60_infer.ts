export default undefined;

// Beispiel: Pattern Matching mit infer von Strings
//
//   - parsePath soll ein Objekt zurückliefern,
//     In dem die Platzhalter aus der übergebenen URLs als Keys und die Werte als Strings enthalten sind
//
// - Segments type => wie eine rekursive Funktion, in der wir eine Liste für das Ergebnis übergeben

declare function parsePath<S extends string>(url: S): any;

const path = "/api/v1/:userId/likes/:likeId";

const r = parsePath(path);
r.likeId; // OK
r.personId; // ERROR
