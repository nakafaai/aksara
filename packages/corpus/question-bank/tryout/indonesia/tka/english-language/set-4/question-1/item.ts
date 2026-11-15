import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "bike-share",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}5{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}11{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}10{,}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}6{,}000$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}8{,}000$$",
        },
      ],
    },
  },
};

export default item;
