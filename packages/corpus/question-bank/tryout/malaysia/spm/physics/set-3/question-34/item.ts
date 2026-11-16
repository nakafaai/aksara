import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "electronics",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.3\\text{ k}\\Omega$$; in bright light",
        },
        {
          correct: false,
          label: "$$76\\text{ k}\\Omega$$; in darkness",
        },
        {
          correct: false,
          label: "$$1.2\\text{ k}\\Omega$$; in darkness",
        },
        {
          correct: true,
          label: "$$1.3\\text{ k}\\Omega$$; in darkness",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1.3\\text{ k}\\Omega$$; dalam cahaya terang",
        },
        {
          correct: false,
          label: "$$76\\text{ k}\\Omega$$; dalam gelap",
        },
        {
          correct: false,
          label: "$$1.2\\text{ k}\\Omega$$; dalam gelap",
        },
        {
          correct: true,
          label: "$$1.3\\text{ k}\\Omega$$; dalam gelap",
        },
      ],
    },
  },
};

export default item;
