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
          label: "$$1.0\\text{ m}$$, $$10\\text{ m}$$ and $$11\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ and $$10\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ and $$11\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ and $$9.3\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.0\\text{ m}$$, $$10\\text{ m}$$ dan $$11\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ dan $$10\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ dan $$11\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$1.1\\text{ m}$$, $$10\\text{ m}$$ dan $$9.3\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
