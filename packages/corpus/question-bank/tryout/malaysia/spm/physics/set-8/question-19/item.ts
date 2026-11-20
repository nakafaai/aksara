import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.30\\text{ m}$$, $$1.40\\text{ m}$$ and $$1.15\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.30\\text{ m}$$, $$1.10\\text{ m}$$ and $$0.85\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$0.30\\text{ m}$$, $$1.10\\text{ m}$$ and $$1.15\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.60\\text{ m}$$, $$0.50\\text{ m}$$ and $$1.15\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$0.30\\text{ m}$$, $$1.40\\text{ m}$$ dan $$1.15\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.30\\text{ m}$$, $$1.10\\text{ m}$$ dan $$0.85\\text{ m}$$",
        },
        {
          correct: true,
          label:
            "$$0.30\\text{ m}$$, $$1.10\\text{ m}$$ dan $$1.15\\text{ m}$$",
        },
        {
          correct: false,
          label:
            "$$0.60\\text{ m}$$, $$0.50\\text{ m}$$ dan $$1.15\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
