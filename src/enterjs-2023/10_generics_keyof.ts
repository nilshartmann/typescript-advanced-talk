export default undefined;

// Wir wollen eine Funktion (validate), die ein Property eines Objektes validieren kann.
//  - Der Funktion werden zwei Parameter übergeben:
//    - Ein Objekt mit zu validierenden Werten
//    - Ein Key aus dem Objekt
//  - Die Funktion liefert true/false zurück, je nachdem, ob der Wert gültig war oder nicht
//  - Die Implementierung der Funktion lassen wir aus, es geht nur um die Typ-Beschreibungen
//    - Der zweite Parameter muss ein gültiger Parameter aus dem Objekt sein

declare function validate(o: any, p: any): boolean;

validate({ lastname: "Mueller" }, "lastname"); // OK
validate({ lastname: "Mueller" }, "firstname"); // ERR: firstname kein gueltiger Key
validate("Mueller", "lastname"); // ERR: "Mueller" kein Objekt
