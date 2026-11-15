import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=2$$ und $$x=-3$$",
        },
        {
          correct: false,
          label:
            "$$x=\\frac{11-\\sqrt{97}}{2}$$ und $$x=\\frac{11+\\sqrt{97}}{2}$$",
        },
        {
          correct: true,
          label: "$$x=-2$$ und $$x=3$$",
        },
        {
          correct: false,
          label: "Es gibt keine weiteren reellen Nullstellen.",
        },
        {
          correct: false,
          label: "$$x=-1$$ und $$x=6$$",
        },
        {
          correct: false,
          label: "$$x=2$$ und $$x=3$$",
        },
      ],
    },
  },
};

export default item;
