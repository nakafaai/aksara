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
          label: "$$\\text{Rp}3{,}9\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{,}9\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}7{,}8\\text{ juta}$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}4{,}3\\text{ juta}$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{,}5\\text{ juta}$$",
        },
      ],
    },
  },
};

export default item;
