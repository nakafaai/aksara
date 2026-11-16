import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "homeostasis-and-the-human-urinary-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ mg cm}^{-3}$$ and $$525\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$4.2\\text{ mg cm}^{-3}$$ and $$0\\text{ mg}$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ mg cm}^{-3}$$ and $$150\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ mg cm}^{-3}$$ and $$1.2\\text{ mg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$3.0\\text{ mg cm}^{-3}$$ dan $$525\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$4.2\\text{ mg cm}^{-3}$$ dan $$0\\text{ mg}$$",
        },
        {
          correct: true,
          label: "$$3.0\\text{ mg cm}^{-3}$$ dan $$150\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$3.0\\text{ mg cm}^{-3}$$ dan $$1.2\\text{ mg}$$",
        },
      ],
    },
  },
};

export default item;
