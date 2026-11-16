import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "consumer-and-industrial-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "86 cm³" },
        { correct: true, label: "172 cm³" },
        { correct: false, label: "345 cm³" },
        { correct: false, label: "17.2 cm³" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "86 cm³" },
        { correct: true, label: "172 cm³" },
        { correct: false, label: "345 cm³" },
        { correct: false, label: "17.2 cm³" },
      ],
    },
  },
};

export default item;
