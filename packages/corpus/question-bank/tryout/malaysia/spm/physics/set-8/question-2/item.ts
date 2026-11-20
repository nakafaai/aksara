import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.20\\text{ s}$$, $$0.090\\text{ s}$$ and $$9\\%$$",
        },
        {
          correct: false,
          label: "$$0.21\\text{ s}$$, $$0.11\\text{ s}$$ and $$17\\%$$",
        },
        {
          correct: false,
          label: "$$0.21\\text{ s}$$, $$0.11\\text{ s}$$ and $$2\\%$$",
        },
        {
          correct: true,
          label: "$$0.21\\text{ s}$$, $$0.11\\text{ s}$$ and $$9\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.20\\text{ s}$$, $$0.090\\text{ s}$$ dan $$9\\%$$",
        },
        {
          correct: false,
          label: "$$0.21\\text{ s}$$, $$0.11\\text{ s}$$ dan $$17\\%$$",
        },
        {
          correct: false,
          label: "$$0.21\\text{ s}$$, $$0.11\\text{ s}$$ dan $$2\\%$$",
        },
        {
          correct: true,
          label: "$$0.21\\text{ s}$$, $$0.11\\text{ s}$$ dan $$9\\%$$",
        },
      ],
    },
  },
};

export default item;
