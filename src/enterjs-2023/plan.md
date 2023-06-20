# 10

Wir wollen eine Funktion (validate), die ein Property eines Objektes validieren kann.
 - Der Funktion werden zwei Parameter übergeben:
   - Ein Objekt mit zu validierenden Werten
   - Ein Key aus dem Objekt
 - Die Funktion liefert true/false zurück, je nachdem, ob der Wert gültig war oder nicht
 - Die Implementierung der Funktion lassen wir aus, es geht nur um die Typ-Beschreibungen
   - Der zweite Parameter muss ein gültiger Parameter aus dem Objekt sein

# 15
Erweiterung der validate-Funktion:
 - der dritte Parameter soll nun eine Callback-Funktion sein, die
   den Wert validiert (verifyFn)
 - Anforderung:
     - diese Callback-Funktion soll einen Parameter entgegenen nehmen
     - der Typ des Parameters muss dem ausgewählten Typ aus dem Objekt entsprechen
     - der Rückgabe-Typ der funktion soll boolean sein
```
 verifyFn: (value: O[P]) => boolean
```

 # 20
Wir bauen nun eine abgewandelte validate-Funktion:
 - die neue Variante soll weiterhin ein Objekt entgegennehmen
 - NEU: nicht einen einzelnen Wert validieren, sondern das ganze Objekt!
   ** zweiter Parameter entfällt also**
 - NEU: der Rückgabe-Typ ist ein Objekt mit allen Keys aus dem zu validierenden Objekt,
        aber jeweils mit true/false als Rückgabewert
 - (Um die "verify"-Funktionen kümmern wir uns im nächsten Schritt, hier lassen wir
    die erstmal weg.)
 - ** zweiter und dritter Parameter entfallen also erstmal**
 ```
type ValidatedObject<O extends object> = {
  [Key in keyof O]: boolean;
};
 ```

 # 25

Nun wollen wir wieder die verify-Funktionen übergeben.
Dazu soll die validate-Funktion als zweiten Parameter ("rules") ein Objekt entgegennehmen,
  das alle Keys aus o enthält, als Wert aber jeweils die verify Funktion
```
type RulesObject<O extends object> = {
  [Key in keyof O]: (value: O[Key]) => boolean;
};
```

# 30
Neue Anforderung für die validate-Funktion:
 - wenn im Objekt eine FUNKTION enthalten ist, soll deren RÜCKGABE-Wert validiert werden:
1. Erst Conditional Type am Beispiel `getLength(null|string):S extends string ? number : null ` erklären
2. Dann herleiten, wie das Inference der Rückgabeparameter funktioniert:
```
type RetValue<F extends Function> = F extends (...args: any) => infer RET_VALUE
  ? RET_VALUE
  : never;
```
3. Dann das Rules-Objekt anpassen:
```
type RulesObject<O extends object> = {
  [Key in keyof O]: O[Key] extends Function
    ? (value: RetValue<O[Key]>) => boolean
    : (value: O[Key]) => boolean;
};
```

# 40

Neue Anforderung für die validate-Funktion:
 - Die Keys im rules-Objekt sollen jeweils `validateKEYNAME` heißen:
    lastname -> validateLastname()
    age -> validateAge()

```
type ValidateFnName<S extends string> = `validate${Capitalize<S>}`;

type RulesObject<O extends object> = {
  [Key in keyof O & string as ValidateFnName<Key>]: O[Key] extends Function
    ? (value: RetValue<O[Key]>) => boolean
    : (value: O[Key]) => boolean;
};
```

