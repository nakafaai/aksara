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
            "$$1.5\\text{ m s}^{-1}$$, and back after $$8.0\\text{ s}$$ at $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, and back after $$6.0\\text{ s}$$ at $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, and back after $$8.0\\text{ s}$$ at $$12\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$2.5\\text{ m s}^{-1}$$, and back after $$8.0\\text{ s}$$ at $$6.0\\text{ m s}^{-1}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.5\\text{ m s}^{-1}$$, dan kembali selepas $$8.0\\text{ s}$$ pada $$6.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, dan kembali selepas $$6.0\\text{ s}$$ pada $$3.0\\text{ m s}^{-1}$$",
        },
        {
          correct: false,
          label:
            "$$2.5\\text{ m s}^{-1}$$, dan kembali selepas $$8.0\\text{ s}$$ pada $$12\\text{ m s}^{-1}$$",
        },
        {
          correct: true,
          label:
            "$$2.5\\text{ m s}^{-1}$$, dan kembali selepas $$8.0\\text{ s}$$ pada $$6.0\\text{ m s}^{-1}$$",
        },
      ],
    },
  },
};

export default item;
