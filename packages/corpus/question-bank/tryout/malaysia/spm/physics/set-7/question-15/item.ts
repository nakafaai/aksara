import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-4",
    topic: "waves",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ m}$$, $$12\\text{ m s}^{-1}$$ and $$15$$ fades",
        },
        {
          correct: true,
          label: "$$1.5\\text{ m}$$, $$6.0\\text{ m s}^{-1}$$ and $$7$$ fades",
        },
        {
          correct: false,
          label: "$$1.5\\text{ m}$$, $$6.0\\text{ m s}^{-1}$$ and $$15$$ fades",
        },
        {
          correct: false,
          label: "$$0.75\\text{ m}$$, $$3.0\\text{ m s}^{-1}$$ and $$3$$ fades",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$3.0\\text{ m}$$, $$12\\text{ m s}^{-1}$$ dan $$15$$ kali pudar",
        },
        {
          correct: true,
          label:
            "$$1.5\\text{ m}$$, $$6.0\\text{ m s}^{-1}$$ dan $$7$$ kali pudar",
        },
        {
          correct: false,
          label:
            "$$1.5\\text{ m}$$, $$6.0\\text{ m s}^{-1}$$ dan $$15$$ kali pudar",
        },
        {
          correct: false,
          label:
            "$$0.75\\text{ m}$$, $$3.0\\text{ m s}^{-1}$$ dan $$3$$ kali pudar",
        },
      ],
    },
  },
};

export default item;
