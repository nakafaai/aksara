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
          label: "pH $$2$$, $$50.0\\text{ cm}^3$$, $$10.8\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "pH $$3$$, $$25.0\\text{ cm}^3$$, $$10.8\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "pH $$3$$, $$50.0\\text{ cm}^3$$, $$10.8\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "pH $$3$$, $$50.0\\text{ cm}^3$$, $$12.0\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "pH $$2$$, $$50.0\\text{ cm}^3$$, $$10.8\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "pH $$3$$, $$25.0\\text{ cm}^3$$, $$10.8\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "pH $$3$$, $$50.0\\text{ cm}^3$$, $$10.8\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "pH $$3$$, $$50.0\\text{ cm}^3$$, $$12.0\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
