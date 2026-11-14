import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "craft-workshop",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}700{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}745{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}740{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}790{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}645{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
