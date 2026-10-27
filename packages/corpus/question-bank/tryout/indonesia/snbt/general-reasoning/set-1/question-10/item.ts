import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6\\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$7\\text{ menit}$$",
        },
        {
          correct: true,
          label: "$$8\\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$9\\text{ menit}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ menit}$$",
        },
      ],
    },
  },
};

export default item;
