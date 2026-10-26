import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x^2+\\frac1{x^2}=7$$",
        },
        {
          correct: true,
          label: "$$(x-\\frac1x)^2=5$$",
        },
        {
          correct: true,
          label: "$$x$$ merupakan akar $$t^2-3t+1=0$$.",
        },
        {
          correct: false,
          label: "$$x$$ merupakan bilangan rasional.",
        },
        {
          correct: true,
          label: "$$x^3+\\frac1{x^3}=18$$",
        },
      ],
    },
  },
};

export default item;
