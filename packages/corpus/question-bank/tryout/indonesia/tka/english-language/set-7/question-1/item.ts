import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "island-ferry",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}135{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}143{,}750$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}168{,}750$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}193{,}750$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}218{,}750$$",
        },
      ],
    },
  },
};

export default item;
