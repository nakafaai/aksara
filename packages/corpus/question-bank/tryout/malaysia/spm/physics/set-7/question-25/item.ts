import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.0\\text{ m}$$, $$10\\text{ m}$$ and $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$20\\text{ m}$$ and $$13\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ and $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ and $$5.0\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.0\\text{ m}$$, $$10\\text{ m}$$ dan $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$20\\text{ m}$$ dan $$13\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ dan $$15\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ dan $$5.0\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
