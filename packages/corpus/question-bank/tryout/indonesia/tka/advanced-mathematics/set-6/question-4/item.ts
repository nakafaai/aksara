import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
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
          label: "$$\\text{Rp}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}500{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}750{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}800{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}700{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
