import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12\\text{ N}$$, and $$8.4\\text{ N}$$ on the mountain",
        },
        {
          correct: false,
          label: "$$12\\text{ N}$$, and $$12\\text{ N}$$ on the mountain",
        },
        {
          correct: false,
          label: "$$8.0\\text{ N}$$, and $$5.6\\text{ N}$$ on the mountain",
        },
        {
          correct: false,
          label: "$$20\\text{ N}$$, and $$14\\text{ N}$$ on the mountain",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$12\\text{ N}$$, dan $$8.4\\text{ N}$$ di atas gunung",
        },
        {
          correct: false,
          label: "$$12\\text{ N}$$, dan $$12\\text{ N}$$ di atas gunung",
        },
        {
          correct: false,
          label: "$$8.0\\text{ N}$$, dan $$5.6\\text{ N}$$ di atas gunung",
        },
        {
          correct: false,
          label: "$$20\\text{ N}$$, dan $$14\\text{ N}$$ di atas gunung",
        },
      ],
    },
  },
};

export default item;
