import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$42\\,000\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$36\\,000\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$14\\,000\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7\\,700\\text{ km}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$42\\,000\\text{ km}$$",
        },
        {
          correct: true,
          label: "$$36\\,000\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$14\\,000\\text{ km}$$",
        },
        {
          correct: false,
          label: "$$7\\,700\\text{ km}$$",
        },
      ],
    },
  },
};

export default item;
