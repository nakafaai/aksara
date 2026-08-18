import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Jede tropische Fischpopulation wandert polwärts",
      value: false,
    },
    {
      label:
        "Die Erwärmung hat die Verbreitungsgebiete vieler Meeresarten polwärts verschoben",
      value: true,
    },
    {
      label:
        "Die Beobachtung eines einzelnen polwärts wandernden Fisches reicht als Beweis für die Erwärmung des Ozeans aus",
      value: false,
    },
    {
      label:
        "Der Klimawandel beeinflusst die Produktivität der Fischerei in jeder Region gleich",
      value: false,
    },
    {
      label:
        "Für tropische und subtropische Fischereien werden größere Produktivitätsgewinne erwartet als für polnähere Regionen",
      value: false,
    },
  ],
};

export default choices;
