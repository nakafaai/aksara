import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "scooter-energy",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}375$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}500$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}6{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}30{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}60{.}000$$",
        },
      ],
    },
  },
};

export default item;
