import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$81 \\text{ dan } 10$$",
        },
        {
          correct: false,
          label: "$$66 \\text{ dan } 11$$",
        },
        {
          correct: true,
          label: "$$65 \\text{ dan } 9$$",
        },
        {
          correct: false,
          label: "$$68 \\text{ dan } 12$$",
        },
        {
          correct: false,
          label: "$$68 \\text{ dan } 8$$",
        },
      ],
    },
  },
};

export default item;
