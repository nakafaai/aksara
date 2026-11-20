import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "acids-bases-and-salts",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12.7$$, $$11.0$$, $$12.4$$",
        },
        {
          correct: true,
          label: "$$13.0$$, $$11.0$$, $$12.7$$",
        },
        {
          correct: false,
          label: "$$13.0$$, $$11.0$$, $$12.0$$",
        },
        {
          correct: false,
          label: "$$13.0$$, $$11.0$$, $$13.0$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$12.7$$, $$11.0$$, $$12.4$$",
        },
        {
          correct: true,
          label: "$$13.0$$, $$11.0$$, $$12.7$$",
        },
        {
          correct: false,
          label: "$$13.0$$, $$11.0$$, $$12.0$$",
        },
        {
          correct: false,
          label: "$$13.0$$, $$11.0$$, $$13.0$$",
        },
      ],
    },
  },
};

export default item;
