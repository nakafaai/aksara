import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electricity",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$5.0\\,\\Omega$$; $$5.3\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$5.0\\,\\Omega$$; $$3.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$6.0\\,\\Omega$$; $$4.8\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$4.0\\,\\Omega$$; $$6.0\\text{ W}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$5.0\\,\\Omega$$; $$5.3\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$5.0\\,\\Omega$$; $$3.0\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$6.0\\,\\Omega$$; $$4.8\\text{ W}$$",
        },
        {
          correct: false,
          label: "$$4.0\\,\\Omega$$; $$6.0\\text{ W}$$",
        },
      ],
    },
  },
};

export default item;
