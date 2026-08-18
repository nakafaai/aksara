import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jede traditionelle Tracht muss von einem Familienmitglied hergestellt werden",
      value: false,
    },
    {
      label:
        "Die Tradition verbindet Kleidung, gemeinsames Wissen und soziale Praktiken, die Identität mit gemeinschaftlicher Zugehörigkeit verknüpfen",
      value: true,
    },
    {
      label:
        "Traditionelle Trachten werden nur bei öffentlichen Feiern getragen",
      value: false,
    },
    {
      label:
        "Lokale Fachleute spielen keine Rolle, weil Wissen ausschließlich in Familien weitergegeben wird",
      value: false,
    },
    {
      label:
        "Unterschiedliche traditionelle Trachten verhindern ein Gefühl der Wiedererkennung",
      value: false,
    },
  ],
};

export default choices;
