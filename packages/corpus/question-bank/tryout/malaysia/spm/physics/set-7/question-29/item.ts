import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$576\\text{ W}$$, $$10\\text{ A}$$ and $$80\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$10\\text{ A}$$ and $$80\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ A}$$ and $$23\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$10\\text{ A}$$ and $$18\\,\\Omega$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$576\\text{ W}$$, $$10\\text{ A}$$ dan $$80\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$10\\text{ A}$$ dan $$80\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ A}$$ dan $$23\\,\\Omega$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$10\\text{ A}$$ dan $$18\\,\\Omega$$",
        },
      ],
    },
  },
};

export default item;
