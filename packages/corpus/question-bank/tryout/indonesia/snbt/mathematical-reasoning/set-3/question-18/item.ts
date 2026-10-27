import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$16(\\sqrt{2}-1)$$",
        },
        {
          correct: false,
          label: "$$16$$",
        },
        {
          correct: true,
          label: "$$16(\\sqrt{3}-1)$$",
        },
        {
          correct: false,
          label: "$$16\\sqrt{3}$$",
        },
        {
          correct: false,
          label: "$$32\\sqrt{3}$$",
        },
      ],
    },
  },
};

export default item;
