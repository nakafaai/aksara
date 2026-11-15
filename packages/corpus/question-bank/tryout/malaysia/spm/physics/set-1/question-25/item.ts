import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$125\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$260\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$160\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$200\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$125\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$260\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$160\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
