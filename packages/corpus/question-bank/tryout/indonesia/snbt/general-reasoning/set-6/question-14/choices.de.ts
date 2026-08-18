import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label: "Der Direktor sagt beide Vorhaben für dieses Jahr ab.",
      value: false,
    },
    {
      label:
        "Der Direktor verschiebt beide Vorhaben bis zur Erteilung der Genehmigung.",
      value: false,
    },
    {
      label: "PT Batik verkauft das neue Produkt in diesem Jahr nicht.",
      value: false,
    },
    {
      label: "PT Batik setzt in diesem Jahr keines der beiden Vorhaben um.",
      value: false,
    },
    {
      label: "PT Batik verkauft das neue Produkt in diesem Jahr.",
      value: true,
    },
  ],
};

export default choices;
