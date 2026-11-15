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
          label: "$$1.00$$",
        },
        {
          correct: false,
          label: "$$4.00$$",
        },
        {
          correct: false,
          label: "$$0.57$$",
        },
        {
          correct: true,
          label: "$$1.75$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.00$$",
        },
        {
          correct: false,
          label: "$$4.00$$",
        },
        {
          correct: false,
          label: "$$0.57$$",
        },
        {
          correct: true,
          label: "$$1.75$$",
        },
      ],
    },
  },
};

export default item;
