import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "After $$12.0\\text{ s}$$ at $$144\\text{ m}$$, then $$1.9\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "After $$12.5\\text{ s}$$ at $$150\\text{ m}$$, then $$1.3\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "After $$12.5\\text{ s}$$ at $$150\\text{ m}$$, then $$2.7\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "After $$10.0\\text{ s}$$ at $$120\\text{ m}$$, then $$1.3\\text{ m s}^{-2}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Selepas $$12.0\\text{ s}$$ pada $$144\\text{ m}$$, kemudian $$1.9\\text{ m s}^{-2}$$",
        },
        {
          correct: true,
          label:
            "Selepas $$12.5\\text{ s}$$ pada $$150\\text{ m}$$, kemudian $$1.3\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Selepas $$12.5\\text{ s}$$ pada $$150\\text{ m}$$, kemudian $$2.7\\text{ m s}^{-2}$$",
        },
        {
          correct: false,
          label:
            "Selepas $$10.0\\text{ s}$$ pada $$120\\text{ m}$$, kemudian $$1.3\\text{ m s}^{-2}$$",
        },
      ],
    },
  },
};

export default item;
