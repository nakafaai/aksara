import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Jedes Bauteil in Regal C hat die Erstprüfung bestanden.",
      value: false,
    },
    {
      label:
        "Ein Bauteil, das die Erstprüfung nicht besteht, durchläuft niemals die Belastungsprüfung.",
      value: false,
    },
    {
      label: "Jedes Bauteil mit blauem Siegel wird in Regal C abgelegt.",
      value: true,
    },
    {
      label:
        "Nur Bauteile mit blauem Siegel durchlaufen die Belastungsprüfung.",
      value: false,
    },
    {
      label: "Jedes zunächst geprüfte Bauteil erhält ein blaues Siegel.",
      value: false,
    },
  ],
};

export default choices;
