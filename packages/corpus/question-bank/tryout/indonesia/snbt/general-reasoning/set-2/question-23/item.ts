import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "meteran",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lebih murah $$\\text{Rp}25{.}000$$",
        },
        {
          correct: false,
          label: "Lebih murah $$\\text{Rp}10{.}000$$",
        },
        {
          correct: true,
          label: "Lebih mahal $$\\text{Rp}4{.}000$$",
        },
        {
          correct: false,
          label: "Lebih mahal $$\\text{Rp}29{.}000$$",
        },
        {
          correct: false,
          label: "Lebih mahal $$\\text{Rp}76{.}000$$",
        },
      ],
    },
  },
};

export default item;
