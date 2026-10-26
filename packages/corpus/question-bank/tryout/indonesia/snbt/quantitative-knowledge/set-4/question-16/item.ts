import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-10$$",
        },
        {
          correct: false,
          label: "$$-5$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$14$$",
        },
        {
          correct: true,
          label: "$$-14$$",
        },
      ],
    },
  },
};

export default item;
