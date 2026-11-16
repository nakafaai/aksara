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
          label: "$$72.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$74.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$82.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$76.0\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$72.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$74.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$82.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$76.0\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
