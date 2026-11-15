import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "library-loans",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}25{,}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}23{,}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}22{,}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}21{,}500$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}10{,}750$$",
        },
      ],
    },
  },
};

export default item;
