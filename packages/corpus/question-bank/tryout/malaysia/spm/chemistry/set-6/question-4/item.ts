import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{C}_6\\text{H}_{14}$$, $$2280\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_5\\text{H}_8\\text{O}$$, $$1560\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_6\\text{H}_{12}$$, $$1440\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_6\\text{H}_{12}$$, $$2160\\text{ cm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{C}_6\\text{H}_{14}$$, $$2280\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_5\\text{H}_8\\text{O}$$, $$1560\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{C}_6\\text{H}_{12}$$, $$1440\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{C}_6\\text{H}_{12}$$, $$2160\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
