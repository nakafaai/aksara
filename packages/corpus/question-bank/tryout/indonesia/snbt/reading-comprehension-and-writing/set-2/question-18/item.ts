import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$(1)\\rightarrow(5)\\rightarrow(4)\\rightarrow(3)\\rightarrow(2)$$.",
        },
        {
          correct: true,
          label:
            "$$(4)\\rightarrow(5)\\rightarrow(1)\\rightarrow(3)\\rightarrow(2)$$.",
        },
        {
          correct: false,
          label:
            "$$(4)\\rightarrow(2)\\rightarrow(3)\\rightarrow(1)\\rightarrow(5)$$.",
        },
        {
          correct: false,
          label:
            "$$(5)\\rightarrow(4)\\rightarrow(1)\\rightarrow(3)\\rightarrow(2)$$.",
        },
        {
          correct: false,
          label:
            "$$(5)\\rightarrow(4)\\rightarrow(1)\\rightarrow(2)\\rightarrow(3)$$.",
        },
      ],
    },
  },
};

export default item;
