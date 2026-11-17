import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$13.7\\text{ cm}$$, then $$11.4\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10.5\\text{ cm}$$, then $$8.8\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12.0\\text{ cm}$$, then $$10.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$36.7\\text{ cm}$$, then $$11.4\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$13.7\\text{ cm}$$, kemudian $$11.4\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$10.5\\text{ cm}$$, kemudian $$8.8\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$12.0\\text{ cm}$$, kemudian $$10.0\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$36.7\\text{ cm}$$, kemudian $$11.4\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
