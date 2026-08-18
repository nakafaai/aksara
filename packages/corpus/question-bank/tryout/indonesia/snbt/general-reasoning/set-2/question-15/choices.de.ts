import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der staatliche Ankaufspreis für GKP sinkt von Januar bis April durchgehend",
      value: false,
    },
    {
      label:
        "Der Erzeugerpreis für Rohreis steigt und fällt in jedem der vier Monate",
      value: false,
    },
    {
      label:
        "Der Erzeugerpreis für Rohreis ist umgekehrt proportional zum staatlichen Ankaufspreis für GKP",
      value: false,
    },
    {
      label:
        "Der staatliche Ankaufspreis für GKP bleibt von Januar bis April unverändert",
      value: true,
    },
    {
      label:
        "Im März und April ist die Differenz zwischen Erzeugerpreis und staatlichem Ankaufspreis gleich groß",
      value: false,
    },
  ],
};

export default choices;
