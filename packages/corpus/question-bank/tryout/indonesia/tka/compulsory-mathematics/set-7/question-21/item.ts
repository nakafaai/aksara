import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "gaji",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}4{,}75\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}6{,}05\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}6{,}6\\text{ juta}$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}7{,}35\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}9\\text{ juta}$$",
        },
      ],
    },
  },
};

export default item;
