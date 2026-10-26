import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-4 \\text{ atau } 2$$",
        },
        {
          correct: true,
          label: "$$4 \\text{ atau } -2$$",
        },
        {
          correct: false,
          label: "$$-2 \\text{ atau } 3$$",
        },
        {
          correct: false,
          label: "$$2 \\text{ atau } -3$$",
        },
        {
          correct: false,
          label: "$$3 \\text{ atau } 8$$",
        },
      ],
    },
  },
};

export default item;
