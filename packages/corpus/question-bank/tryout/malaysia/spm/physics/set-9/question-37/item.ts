import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "nuclear-physics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.125\\text{ mg}$$, and $$0.10\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, and $$0.014\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ mg}$$, and $$0.076\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, and $$0.11\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.125\\text{ mg}$$, dan $$0.10\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, dan $$0.014\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ mg}$$, dan $$0.076\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, dan $$0.11\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
