import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "force-and-motion-2",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1600\\text{ N m}^{-1}$$, $$25\\text{ N}$$ and $$120\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$800\\text{ N m}^{-1}$$, $$50\\text{ N}$$ and $$120\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$1600\\text{ N m}^{-1}$$, $$25\\text{ N}$$ and $$240\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$1600\\text{ N m}^{-1}$$, $$25\\text{ N}$$ and $$60\\text{ N}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$1600\\text{ N m}^{-1}$$, $$25\\text{ N}$$ dan $$120\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$800\\text{ N m}^{-1}$$, $$50\\text{ N}$$ dan $$120\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$1600\\text{ N m}^{-1}$$, $$25\\text{ N}$$ dan $$240\\text{ N}$$",
        },
        {
          correct: false,
          label:
            "$$1600\\text{ N m}^{-1}$$, $$25\\text{ N}$$ dan $$60\\text{ N}$$",
        },
      ],
    },
  },
};

export default item;
