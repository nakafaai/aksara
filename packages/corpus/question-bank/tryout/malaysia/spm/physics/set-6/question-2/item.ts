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
          correct: false,
          label: "$$20\\text{ cm}$$ above, and $$0.15\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$ above, and $$0.32\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$ above, and $$0.29\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$10\\text{ cm}$$ above, and $$0.18\\text{ s}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20\\text{ cm}$$ di atas, dan $$0.15\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$ di atas, dan $$0.32\\text{ s}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ cm}$$ di atas, dan $$0.29\\text{ s}$$",
        },
        {
          correct: true,
          label: "$$10\\text{ cm}$$ di atas, dan $$0.18\\text{ s}$$",
        },
      ],
    },
  },
};

export default item;
