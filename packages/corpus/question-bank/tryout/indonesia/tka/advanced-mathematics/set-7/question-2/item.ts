import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}340{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}375{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}337{.}500{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}335{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}360{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
