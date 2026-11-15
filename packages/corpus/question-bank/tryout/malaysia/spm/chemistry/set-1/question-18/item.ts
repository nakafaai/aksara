import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "rate-of-reaction",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$50\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$50\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$8.0\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$20\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$30\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
