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
          label: "$$576\\text{ W}$$, $$10\\text{ A}$$ and $$18\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$10\\text{ A}$$ and $$18\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ A}$$ and $$10\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$1440\\text{ W}$$, $$6.0\\text{ A}$$ and $$14\\text{ A}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$576\\text{ W}$$, $$10\\text{ A}$$ dan $$18\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$960\\text{ W}$$, $$10\\text{ A}$$ dan $$18\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$576\\text{ W}$$, $$2.4\\text{ A}$$ dan $$10\\text{ A}$$",
        },
        {
          correct: false,
          label: "$$1440\\text{ W}$$, $$6.0\\text{ A}$$ dan $$14\\text{ A}$$",
        },
      ],
    },
  },
};

export default item;
