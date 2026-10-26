import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{NNN}$$",
        },
        {
          correct: false,
          label: "$$\\text{PPP}$$",
        },
        {
          correct: false,
          label: "$$\\text{QQQ}$$",
        },
        {
          correct: false,
          label: "$$\\text{RRR}$$",
        },
        {
          correct: true,
          label: "$$\\text{MMM}$$",
        },
      ],
    },
  },
};

export default item;
