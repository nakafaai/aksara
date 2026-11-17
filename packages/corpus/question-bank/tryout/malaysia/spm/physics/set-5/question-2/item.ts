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
          correct: true,
          label: "$$0.97\\text{ m}$$ of string, then $$1.9\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.97\\text{ m}$$ of string, then $$2.1\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.97\\text{ m}$$ of string, then $$1.8\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.97\\text{ m}$$ of string, then still $$2.0\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$0.97\\text{ m}$$ tali, kemudian $$1.9\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.97\\text{ m}$$ tali, kemudian $$2.1\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.97\\text{ m}$$ tali, kemudian $$1.8\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$0.97\\text{ m}$$ tali, kemudian masih $$2.0\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
