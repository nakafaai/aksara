import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$4\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$24\\pi\\text{ m}^2$$",
        },
        {
          correct: true,
          label: "$$28\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$36\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$32\\pi\\text{ m}^2$$",
        },
        {
          correct: false,
          label: "$$64\\pi\\text{ m}^2$$",
        },
      ],
    },
  },
};

export default item;
