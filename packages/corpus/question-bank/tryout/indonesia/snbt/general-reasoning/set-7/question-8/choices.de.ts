import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Sie ist zwingend wahr, weil die grünen Flächen abnahmen.",
      value: false,
    },
    {
      label:
        "Sie ist wahrscheinlich wahr, weil die Landoberflächentemperatur zunahm.",
      value: false,
    },
    {
      label:
        "Sie ist mit Sicherheit falsch, weil das Projekt keine Überschwemmungsdaten erfasste.",
      value: false,
    },
    {
      label:
        "Sie wird von den Angaben nicht gestützt, weil sie eine weder gemessene noch durch eine Regel verknüpfte Folge einführt.",
      value: true,
    },
    {
      label:
        "Sie wird gestützt, weil Schwebstaub und Überschwemmungen gleichwertige Folgen sind.",
      value: false,
    },
  ],
};

export default choices;
