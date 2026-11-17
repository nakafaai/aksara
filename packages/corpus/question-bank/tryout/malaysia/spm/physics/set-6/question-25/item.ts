import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.2 \\times 10^3\\text{ m}^3$$, and $$1.6 \\times 10^4\\text{ m}^3$$ must melt",
        },
        {
          correct: false,
          label:
            "$$3.0 \\times 10^3\\text{ m}^3$$, and $$2.5 \\times 10^4\\text{ m}^3$$ must melt",
        },
        {
          correct: false,
          label:
            "$$3.0 \\times 10^3\\text{ m}^3$$, and $$1.9 \\times 10^4\\text{ m}^3$$ must melt",
        },
        {
          correct: false,
          label: "$$2.7 \\times 10^2\\text{ m}^3$$, and it already shows less",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$2.2 \\times 10^3\\text{ m}^3$$, dan $$1.6 \\times 10^4\\text{ m}^3$$ mesti mencair",
        },
        {
          correct: false,
          label:
            "$$3.0 \\times 10^3\\text{ m}^3$$, dan $$2.5 \\times 10^4\\text{ m}^3$$ mesti mencair",
        },
        {
          correct: false,
          label:
            "$$3.0 \\times 10^3\\text{ m}^3$$, dan $$1.9 \\times 10^4\\text{ m}^3$$ mesti mencair",
        },
        {
          correct: false,
          label:
            "$$2.7 \\times 10^2\\text{ m}^3$$, dan ia sudah kelihatan kurang",
        },
      ],
    },
  },
};

export default item;
