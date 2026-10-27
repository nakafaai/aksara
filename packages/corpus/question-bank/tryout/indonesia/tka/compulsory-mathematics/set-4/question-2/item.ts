import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}14{.}100$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}16{.}875$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}17{.}500$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}17{.}625$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}21{.}875$$",
        },
      ],
    },
  },
};

export default item;
