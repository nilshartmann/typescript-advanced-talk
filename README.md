# TypeScript: fortgeschrittene Typen und Konzepte

Code-Beispiele zu meinem Talks zu TypeScript

## Installation

Im Root-Verzeichnis mittels `pnpm install` (oder `npm install`) TypeScript installieren.

## Verwendung

In `src`-Verzeichnissen findest Du jeweils zwei Dateien

- `<schritt>_<dateiname>.ts` enthält den Ausgangscode eines Beispiels
- `<schritt>_x_<dateiname>.ts` enthält jeweils das fertige Beispiel

Wenn Du selbst ausprobieren möchtest, kannst Du also in den Dateien ohne `x` experimentieren. Ich habe dort (rudimentär) beschrieben, was jeweils zu tun ist.

## VS Code Extension

Wenn Du dir die Extension [scode-twoslash-queries](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-twoslash-queries) für VS Code installiert,
kannst Du in die Zeile unterhalb eines typen oder eine Variable `//  ^?` schreiben, dann zeigt dir VS Code den TypeScript Typen "inline" an:

```

const s = "Hallo";
//    ^?  string

```
