import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$336\\,\\Omega$$, $$0.0983\\text{ W}$$ and $$1.33\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$264\\,\\Omega$$, $$0.0983\\text{ W}$$ and $$0.0983\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$264\\,\\Omega$$, $$0.0983\\text{ W}$$ and $$0.406\\text{ W}$$",
        },
        {
          correct: true,
          label:
            "$$264\\,\\Omega$$, $$0.0983\\text{ W}$$ and $$1.15\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$336\\,\\Omega$$, $$0.0983\\text{ W}$$ dan $$1.33\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$264\\,\\Omega$$, $$0.0983\\text{ W}$$ dan $$0.0983\\text{ W}$$",
        },
        {
          correct: false,
          label:
            "$$264\\,\\Omega$$, $$0.0983\\text{ W}$$ dan $$0.406\\text{ W}$$",
        },
        {
          correct: true,
          label:
            "$$264\\,\\Omega$$, $$0.0983\\text{ W}$$ dan $$1.15\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
