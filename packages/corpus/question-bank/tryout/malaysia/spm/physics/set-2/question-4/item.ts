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
          label: "$$0.71\\text{ s}$$; $$1.44\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.66\\text{ s}$$; $$2.17\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$0.66\\text{ s}$$; $$1.18\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.77\\text{ s}$$; $$1.79\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$0.71\\text{ s}$$; $$1.44\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.66\\text{ s}$$; $$2.17\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$0.66\\text{ s}$$; $$1.18\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$0.77\\text{ s}$$; $$1.79\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
