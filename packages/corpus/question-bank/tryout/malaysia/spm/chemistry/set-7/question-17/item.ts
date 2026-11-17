import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$13.6\\text{ cm}^3$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.6\\text{ cm}^3$$, $$31.3\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.3\\text{ cm}^3$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$25.0\\text{ cm}^3$$, $$62.5\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$13.6\\text{ cm}^3$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.6\\text{ cm}^3$$, $$31.3\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$13.3\\text{ cm}^3$$, $$62.5\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$25.0\\text{ cm}^3$$, $$62.5\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
