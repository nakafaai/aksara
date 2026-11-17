import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$62.5\\text{ kg}$$, $$0\\text{ m}^3$$, $$15.0\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$56.3\\text{ kg}$$, $$13.5\\text{ m}^3$$, $$1.50\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "$$56.3\\text{ kg}$$, $$1.50\\text{ m}^3$$, $$13.5\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$112.5\\text{ kg}$$, $$1.50\\text{ m}^3$$, $$27.0\\text{ m}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$62.5\\text{ kg}$$, $$0\\text{ m}^3$$, $$15.0\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$56.3\\text{ kg}$$, $$13.5\\text{ m}^3$$, $$1.50\\text{ m}^3$$",
        },
        {
          correct: true,
          label:
            "$$56.3\\text{ kg}$$, $$1.50\\text{ m}^3$$, $$13.5\\text{ m}^3$$",
        },
        {
          correct: false,
          label:
            "$$112.5\\text{ kg}$$, $$1.50\\text{ m}^3$$, $$27.0\\text{ m}^3$$",
        },
      ],
    },
  },
};

export default item;
