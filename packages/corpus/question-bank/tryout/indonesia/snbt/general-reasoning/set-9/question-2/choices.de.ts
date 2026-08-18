import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Der Klimawandel hat die Ernährungssicherheit bereits beeinträchtigt",
      value: false,
    },
    {
      label:
        "Seine Auswirkungen können je nach Nutzpflanze und Region unterschiedlich ausfallen",
      value: false,
    },
    {
      label:
        "Mehr Kohlendioxid in der Atmosphäre kann die Nährstoffkonzentration mancher Nutzpflanzen verringern",
      value: false,
    },
    {
      label:
        "Mehr Kohlendioxid in der Atmosphäre kann Wachstum und Ertrag von Nutzpflanzen nur verringern",
      value: true,
    },
    {
      label:
        "Höhere Temperaturen, veränderte Niederschläge und Extremereignisse können die Ernährungssicherheit beeinträchtigen",
      value: false,
    },
  ],
};

export default choices;
