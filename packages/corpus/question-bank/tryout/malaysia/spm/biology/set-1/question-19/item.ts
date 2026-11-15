import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "movement-of-substances-across-the-plasma-membrane",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60\\%$$",
        },
        {
          correct: true,
          label: "$$56\\%$$",
        },
        {
          correct: false,
          label: "$$50\\%$$",
        },
        {
          correct: false,
          label: "$$67\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$60\\%$$",
        },
        {
          correct: true,
          label: "$$56\\%$$",
        },
        {
          correct: false,
          label: "$$50\\%$$",
        },
        {
          correct: false,
          label: "$$67\\%$$",
        },
      ],
    },
  },
};

export default item;
