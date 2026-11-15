import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "respiratory-systems",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$392\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$292\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$14.6\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$392\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$100\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$292\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$14.6\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
