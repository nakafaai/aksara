import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$20$$",
        },
        {
          correct: true,
          label: "$$20$$ oder $$22$$",
        },
        {
          correct: false,
          label: "$$22$$",
        },
        {
          correct: false,
          label: "$$14$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{37}$$",
        },
        {
          correct: false,
          label: "$$24$$",
        },
      ],
    },
  },
};

export default item;
