import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25.0\\%$$, $$13.5\\text{ g}$$, $$32.4\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$12.7\\text{ g}$$, $$43.2\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$13.5\\text{ g}$$, $$16.2\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$13.5\\text{ g}$$, $$32.4\\text{ g}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$25.0\\%$$, $$13.5\\text{ g}$$, $$32.4\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$12.7\\text{ g}$$, $$43.2\\text{ g}$$",
        },
        {
          correct: false,
          label: "$$75.0\\%$$, $$13.5\\text{ g}$$, $$16.2\\text{ g}$$",
        },
        {
          correct: true,
          label: "$$75.0\\%$$, $$13.5\\text{ g}$$, $$32.4\\text{ g}$$",
        },
      ],
    },
  },
};

export default item;
