import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "parts",
      parts: [
        {
          expression: "3+2\\sqrt{2}",
          kind: "mathEntry",
          label: "a",
          points: 1,
        },
        {
          kind: "extendedText",
          label: "b",
          points: 2,
          rubric: [
            {
              feedback: {
                earned:
                  "Gut, du hast zuerst den Definitionsbereich gesichert und den doppelten Treffer bei k gleich minus acht gefunden.",
                missed:
                  "Sichere vor dem Umformen die Bedingung für beide Logarithmen, bilde dann die quadratische Gleichung und prüfe zuerst, wann ihre Diskriminante null ist.",
              },
              label: "Definitionsbereich und Scheitelpunktfall",
              met: "Die Lösung hält den Definitionsbereich x > 1 (und 4x + k > 0) fest, formt zu x^2 - 6x + (1 - k) = 0 um und bestimmt über die Diskriminante 8 + k = 0 den Wert k = -8 mit der gültigen Lösung x = 3 > 1.",
              points: 1,
            },
            {
              feedback: {
                earned:
                  "Stark, du hast auch den ganzen Bereich gefunden, in dem die kleinere Wurzel am Definitionsbereich scheitert.",
                missed:
                  "Diskriminante gleich null ist nicht der einzige Fall mit einer Lösung. Prüfe bei zwei reellen Wurzeln, ab welchem k genau eine von beiden nicht mehr im Definitionsbereich liegt.",
              },
              label: "Bereich mit einer ausgeschlossenen Wurzel",
              met: "Die Lösung erkennt, dass für k > -8 die zwei Wurzeln 3 ± √(8 + k) auftreten, und prüft die Bedingung x > 1: Die größere Wurzel liegt immer über 1, die kleinere fällt für 3 - √(8 + k) ≤ 1, also für k ≥ -4, aus dem Definitionsbereich, sodass genau k = -8 oder k ≥ -4 bleibt. Folgefehler zählt: richtig auf die eigene quadratische Gleichung angewendet.",
              points: 1,
            },
          ],
        },
        {
          kind: "numericEntry",
          label: "c",
          points: 1,
          value: "-7",
        },
      ],
    },
  },
};

export default item;
