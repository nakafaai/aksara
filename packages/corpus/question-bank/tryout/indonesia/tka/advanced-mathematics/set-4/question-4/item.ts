import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
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
          label: "$$\\text{Rp}11{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}10{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}10{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}19{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}9{.}800{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
