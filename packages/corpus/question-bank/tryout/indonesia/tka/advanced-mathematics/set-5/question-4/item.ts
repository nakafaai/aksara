import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "chips-cooperative",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}520{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}480{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}400{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}560{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}600{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
