import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "assembly-workshop",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}1{.}400{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}440{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}360{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}720{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
