import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.45\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.80\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$0.20\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.45\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.80\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.50\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$0.20\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
