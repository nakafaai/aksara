import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "school-trip",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}11{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}11{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}11{.}300{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}10{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}14{.}000{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
