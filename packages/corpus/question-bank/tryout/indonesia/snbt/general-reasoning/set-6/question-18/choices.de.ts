import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Ein geringerer Verzehr industrieller Transfette verringert die Belastung durch einen vermeidbaren ernährungsbedingten Risikofaktor für koronare Herzkrankheiten.",
      value: true,
    },
    {
      label:
        "Industrielle Transfette behandeln die Symptome eines Schlaganfalls.",
      value: false,
    },
    {
      label:
        "Nur Menschen mit einer Nierenerkrankung müssen industrielle Transfette meiden.",
      value: false,
    },
    {
      label: "Industrielle Transfette steigern zuverlässig den Appetit.",
      value: false,
    },
    {
      label:
        "Industrielle Transfette verhindern, dass der Körper sämtliche Nahrung verdaut.",
      value: false,
    },
  ],
};

export default choices;
