import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.4\\text{ hours}$$",
        },
        {
          correct: false,
          label: "$$5.6\\text{ hours}$$",
        },
        {
          correct: false,
          label: "$$21.5\\text{ hours}$$",
        },
        {
          correct: true,
          label: "$$10.6\\text{ hours}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$7.4\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$5.6\\text{ jam}$$",
        },
        {
          correct: false,
          label: "$$21.5\\text{ jam}$$",
        },
        {
          correct: true,
          label: "$$10.6\\text{ jam}$$",
        },
      ],
    },
  },
};

export default item;
