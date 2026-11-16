import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "$$41\\text{ cm}$$" },
        { correct: false, label: "$$50\\text{ cm}$$" },
        { correct: true, label: "$$59\\text{ cm}$$" },
        { correct: false, label: "$$68\\text{ cm}$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "$$41\\text{ cm}$$" },
        { correct: false, label: "$$50\\text{ cm}$$" },
        { correct: true, label: "$$59\\text{ cm}$$" },
        { correct: false, label: "$$68\\text{ cm}$$" },
      ],
    },
  },
};

export default item;
