import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "gravitation",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.4 \\times 10^{23}\\text{ kg}$$, and $$1.4$$ hours",
        },
        {
          correct: false,
          label: "$$4.4 \\times 10^{23}\\text{ kg}$$, and $$1.5$$ hours",
        },
        {
          correct: false,
          label: "$$1.1 \\times 10^{23}\\text{ kg}$$, and $$3.4$$ hours",
        },
        {
          correct: true,
          label: "$$4.4 \\times 10^{23}\\text{ kg}$$, and $$1.7$$ hours",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.4 \\times 10^{23}\\text{ kg}$$, dan $$1.4$$ jam",
        },
        {
          correct: false,
          label: "$$4.4 \\times 10^{23}\\text{ kg}$$, dan $$1.5$$ jam",
        },
        {
          correct: false,
          label: "$$1.1 \\times 10^{23}\\text{ kg}$$, dan $$3.4$$ jam",
        },
        {
          correct: true,
          label: "$$4.4 \\times 10^{23}\\text{ kg}$$, dan $$1.7$$ jam",
        },
      ],
    },
  },
};

export default item;
