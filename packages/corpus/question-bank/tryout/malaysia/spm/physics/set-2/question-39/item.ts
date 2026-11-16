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
          correct: false,
          label: "$$0.10\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$0.29\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.73\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.036\\text{ kg}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.10\\text{ kg}$$",
        },
        {
          correct: true,
          label: "$$0.29\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.73\\text{ kg}$$",
        },
        {
          correct: false,
          label: "$$0.036\\text{ kg}$$",
        },
      ],
    },
  },
};

export default item;
