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
          correct: true,
          label: "$$1.25\\text{ m}$$, and about $$95$$ minutes",
        },
        {
          correct: false,
          label: "$$2.5\\text{ m}$$, and about $$134$$ minutes",
        },
        {
          correct: false,
          label: "$$1.25\\text{ m}$$, and about $$42$$ minutes",
        },
        {
          correct: false,
          label: "$$1.25\\text{ m}$$, and about $$190$$ minutes",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$1.25\\text{ m}$$, dan kira-kira $$95$$ minit",
        },
        {
          correct: false,
          label: "$$2.5\\text{ m}$$, dan kira-kira $$134$$ minit",
        },
        {
          correct: false,
          label: "$$1.25\\text{ m}$$, dan kira-kira $$42$$ minit",
        },
        {
          correct: false,
          label: "$$1.25\\text{ m}$$, dan kira-kira $$190$$ minit",
        },
      ],
    },
  },
};

export default item;
