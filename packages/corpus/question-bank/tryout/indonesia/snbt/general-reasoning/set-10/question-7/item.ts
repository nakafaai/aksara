import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{MMM}$$",
        },
        {
          correct: false,
          label: "$$\\text{PPP}$$",
        },
        {
          correct: true,
          label: "$$\\text{NNN}$$",
        },
        {
          correct: false,
          label: "$$\\text{QQQ}$$",
        },
        {
          correct: false,
          label: "$$\\text{RRR}$$",
        },
      ],
    },
  },
};

export default item;
