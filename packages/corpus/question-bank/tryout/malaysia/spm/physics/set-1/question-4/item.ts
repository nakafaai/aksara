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
          label: "$$225\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4.50\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1.50\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$2.25\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$225\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$4.50\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$1.50\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$2.25\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
