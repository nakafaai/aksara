import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$-3$$",
        },
        {
          correct: true,
          label: "$$3$$",
        },
        {
          correct: false,
          label: "$$4-\\sqrt2$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{17}-1$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$15$$",
        },
      ],
    },
  },
};

export default item;
