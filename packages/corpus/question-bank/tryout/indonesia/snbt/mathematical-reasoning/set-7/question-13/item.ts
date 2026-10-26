import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}2 \\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$4{,}8 \\text{ menit}$$",
        },
        {
          correct: true,
          label: "$$16{,}8 \\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$18{,}8 \\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$14{,}2 \\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
