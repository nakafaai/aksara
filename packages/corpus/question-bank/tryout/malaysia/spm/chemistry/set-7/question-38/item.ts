import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "polymers",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.00\\text{ kg}$$, $$1.83\\text{ kg}$$, $$1.00\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ kg}$$, $$0.611\\text{ kg}$$, $$0.333\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ kg}$$, $$1.83\\text{ kg}$$, $$1.00\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.25\\text{ kg}$$, $$1.83\\text{ kg}$$, $$1.00\\text{ m}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$1.00\\text{ kg}$$, $$1.83\\text{ kg}$$, $$1.00\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$1.25\\text{ kg}$$, $$0.611\\text{ kg}$$, $$0.333\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$0.80\\text{ kg}$$, $$1.83\\text{ kg}$$, $$1.00\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "$$1.25\\text{ kg}$$, $$1.83\\text{ kg}$$, $$1.00\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
