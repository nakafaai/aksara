import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2{,}4$$",
        },
        {
          correct: false,
          label: "$$1{,}8$$",
        },
        {
          correct: false,
          label: "$$2{,}0$$",
        },
        {
          correct: false,
          label: "$$3{,}2$$",
        },
        {
          correct: false,
          label: "$$3{,}6$$",
        },
      ],
    },
  },
};

export default item;
