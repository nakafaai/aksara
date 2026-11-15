import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-2\\le x\\le4$$",
        },
        {
          correct: false,
          label: "$$x\\le-4$$ oder $$x\\ge2$$",
        },
        {
          correct: false,
          label: "$$-4\\le x\\le2$$",
        },
        {
          correct: false,
          label: "$$x\\ge4$$",
        },
        {
          correct: false,
          label: "$$x\\le-2\\sqrt2$$ oder $$x\\ge2\\sqrt2$$",
        },
        {
          correct: true,
          label: "$$x\\le-2$$ oder $$x\\ge4$$",
        },
      ],
    },
  },
};

export default item;
