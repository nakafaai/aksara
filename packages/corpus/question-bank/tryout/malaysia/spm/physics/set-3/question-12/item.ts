import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "heat",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.0 \\times 10^5\\text{ J kg}^{-1}$$, no heat lost, and $$75\\text{ g}$$ in the third run",
        },
        {
          correct: true,
          label:
            "$$3.36 \\times 10^5\\text{ J kg}^{-1}$$, $$8\\text{ W}$$ lost, and $$82\\text{ g}$$ in the third run",
        },
        {
          correct: false,
          label:
            "$$3.73 \\times 10^5\\text{ J kg}^{-1}$$, no heat lost, and $$80\\text{ g}$$ in the third run",
        },
        {
          correct: false,
          label:
            "$$3.36 \\times 10^5\\text{ J kg}^{-1}$$, $$16\\text{ W}$$ lost, and $$75\\text{ g}$$ in the third run",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$4.0 \\times 10^5\\text{ J kg}^{-1}$$, tiada haba hilang, dan $$75\\text{ g}$$ dalam larian ketiga",
        },
        {
          correct: true,
          label:
            "$$3.36 \\times 10^5\\text{ J kg}^{-1}$$, $$8\\text{ W}$$ hilang, dan $$82\\text{ g}$$ dalam larian ketiga",
        },
        {
          correct: false,
          label:
            "$$3.73 \\times 10^5\\text{ J kg}^{-1}$$, tiada haba hilang, dan $$80\\text{ g}$$ dalam larian ketiga",
        },
        {
          correct: false,
          label:
            "$$3.36 \\times 10^5\\text{ J kg}^{-1}$$, $$16\\text{ W}$$ hilang, dan $$75\\text{ g}$$ dalam larian ketiga",
        },
      ],
    },
  },
};

export default item;
