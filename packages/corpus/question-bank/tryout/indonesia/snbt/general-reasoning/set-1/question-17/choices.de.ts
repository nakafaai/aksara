import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Eine einzelne Gewichtsmessung beweist, dass ein Kind vollständig gesund ist.",
      value: false,
    },
    {
      label:
        "Der Kopfumfang allein bestimmt in jedem Alter den Ernährungszustand eines Kindes.",
      value: false,
    },
    {
      label:
        "Jede Zunahme von Gewicht oder Körpergröße bedeutet automatisch, dass das Wachstum altersgerecht ist.",
      value: false,
    },
    {
      label:
        "Das Wachstum eines Kindes wird anhand mehrerer altersgerechter Messwerte und ihrer Entwicklung über längere Zeit beurteilt.",
      value: true,
    },
    {
      label:
        "Wachstumskurven ersetzen jede weitere fachliche Beurteilung der Gesundheit eines Kindes.",
      value: false,
    },
  ],
};

export default choices;
