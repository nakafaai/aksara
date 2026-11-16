import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "9.2 g of ethanol and 2.4 dm³ of carbon dioxide" },
        { correct: true, label: "9.2 g of ethanol and 4.8 dm³ of carbon dioxide" },
        { correct: false, label: "4.6 g of ethanol and 2.4 dm³ of carbon dioxide" },
        { correct: false, label: "18.4 g of ethanol and 4.8 dm³ of carbon dioxide" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "9.2 g etanol dan 2.4 dm³ karbon dioksida" },
        { correct: true, label: "9.2 g etanol dan 4.8 dm³ karbon dioksida" },
        { correct: false, label: "4.6 g etanol dan 2.4 dm³ karbon dioksida" },
        { correct: false, label: "18.4 g etanol dan 4.8 dm³ karbon dioksida" },
      ],
    },
  },
};

export default item;
