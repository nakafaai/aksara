import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "light-and-optics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$4.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$5.1\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ cm}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4.0\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$4.5\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$5.1\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$6.0\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
