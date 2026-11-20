import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "electromagnetism",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.0480\\text{ J}$$, $$0.060\\text{ W}$$ and $$75$$",
        },
        {
          correct: false,
          label: "$$0.0408\\text{ J}$$, $$0.060\\text{ W}$$ and $$88$$",
        },
        {
          correct: false,
          label: "$$0.0240\\text{ J}$$, $$0.060\\text{ W}$$ and $$150$$",
        },
        {
          correct: true,
          label: "$$0.0408\\text{ J}$$, $$0.060\\text{ W}$$ and $$89$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.0480\\text{ J}$$, $$0.060\\text{ W}$$ dan $$75$$",
        },
        {
          correct: false,
          label: "$$0.0408\\text{ J}$$, $$0.060\\text{ W}$$ dan $$88$$",
        },
        {
          correct: false,
          label: "$$0.0240\\text{ J}$$, $$0.060\\text{ W}$$ dan $$150$$",
        },
        {
          correct: true,
          label: "$$0.0408\\text{ J}$$, $$0.060\\text{ W}$$ dan $$89$$",
        },
      ],
    },
  },
};

export default item;
