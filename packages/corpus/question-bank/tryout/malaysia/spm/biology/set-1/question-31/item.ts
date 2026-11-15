import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "ecosystem",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: false,
          label: "$$600$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: true,
          label: "$$96$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$120$$",
        },
        {
          correct: false,
          label: "$$600$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
        {
          correct: true,
          label: "$$96$$",
        },
      ],
    },
  },
};

export default item;
