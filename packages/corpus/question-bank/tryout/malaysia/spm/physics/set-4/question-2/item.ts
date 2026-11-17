import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "measurement",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11.0\\text{ m s}^{-2}$$, and about $$1.1\\%$$",
        },
        {
          correct: false,
          label: "$$9.9\\text{ m s}^{-2}$$, and about $$0.56\\%$$",
        },
        {
          correct: true,
          label: "$$9.9\\text{ m s}^{-2}$$, and about $$1.1\\%$$",
        },
        {
          correct: false,
          label: "$$9.9\\text{ m s}^{-2}$$, and about $$0.28\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11.0\\text{ m s}^{-2}$$, dan kira-kira $$1.1\\%$$",
        },
        {
          correct: false,
          label: "$$9.9\\text{ m s}^{-2}$$, dan kira-kira $$0.56\\%$$",
        },
        {
          correct: true,
          label: "$$9.9\\text{ m s}^{-2}$$, dan kira-kira $$1.1\\%$$",
        },
        {
          correct: false,
          label: "$$9.9\\text{ m s}^{-2}$$, dan kira-kira $$0.28\\%$$",
        },
      ],
    },
  },
};

export default item;
