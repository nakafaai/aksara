import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$23$$ and $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$23$$ and $$200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$46$$ and $$50\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$46$$ and $$100\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$23$$ dan $$100\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$23$$ dan $$200\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$46$$ dan $$50\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$46$$ dan $$100\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
