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
          label: "$$0.125\\text{ mg}$$, and $$10\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, and $$1.4\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ mg}$$, and $$7.6\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, and $$11\\text{ kPa}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.125\\text{ mg}$$, dan $$10\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, dan $$1.4\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$0.33\\text{ mg}$$, dan $$7.6\\text{ kPa}$$",
        },
        {
          correct: false,
          label: "$$0.125\\text{ mg}$$, dan $$11\\text{ kPa}$$",
        },
      ],
    },
  },
};

export default item;
