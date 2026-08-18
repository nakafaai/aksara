import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Das erste Ergebnis, bei dem die Beschäftigten kündigen und eine Abfindung erhalten, tritt nicht ein",
      value: true,
    },
    {
      label: "Die Beschäftigten haben die Schließung des Unternehmens gewählt",
      value: false,
    },
    {
      label:
        "Einige Beschäftigte erhalten nach dem ersten Ergebnis eine Abfindung",
      value: false,
    },
    {
      label: "Beide Ergebnisse treten ein",
      value: false,
    },
    {
      label: "Keines der beiden Ergebnisse tritt ein",
      value: false,
    },
  ],
};

export default choices;
