import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x=4$$",
        },
        {
          correct: false,
          label: "$$x=-2$$",
        },
        {
          correct: false,
          label: "$$x=3$$",
        },
        {
          correct: false,
          label: "$$x=6$$",
        },
        {
          correct: false,
          label: "$$x=1+\\sqrt{21}$$",
        },
        {
          correct: false,
          label: "$$x=1+\\sqrt{41}$$",
        },
      ],
    },
  },
};

export default item;
