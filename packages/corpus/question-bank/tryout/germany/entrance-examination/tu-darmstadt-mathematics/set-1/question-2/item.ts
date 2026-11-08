import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x<-\\frac45$$",
        },
        {
          correct: false,
          label: "$$x>-\\frac45$$",
        },
        {
          correct: false,
          label: "$$x<\\frac45$$",
        },
        {
          correct: false,
          label: "$$x>\\frac45$$",
        },
        {
          correct: false,
          label: "$$x<-2$$",
        },
        {
          correct: false,
          label: "$$x>2$$",
        },
      ],
    },
  },
};

export default item;
