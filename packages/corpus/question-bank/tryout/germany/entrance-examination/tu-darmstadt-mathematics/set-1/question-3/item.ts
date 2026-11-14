import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$x=0$$, $$x=4-\\sqrt6$$, $$x=4+\\sqrt6$$ oder $$x=\\frac{20}{3}$$",
        },
        {
          correct: false,
          label: "$$x=4-\\sqrt6$$ oder $$x=4+\\sqrt6$$",
        },
        {
          correct: false,
          label: "$$x=0$$ oder $$x=\\frac{20}{3}$$",
        },
        {
          correct: false,
          label:
            "$$x=0$$, $$x=4-\\sqrt6$$, $$x=4+\\sqrt6$$ oder $$x=\\frac{22}{3}$$",
        },
        {
          correct: false,
          label: "$$x=4-\\sqrt6$$, $$x=4+\\sqrt6$$ oder $$x=10$$",
        },
        {
          correct: false,
          label:
            "$$x=2$$, $$x=4-\\sqrt6$$, $$x=4+\\sqrt6$$ oder $$x=\\frac{20}{3}$$",
        },
      ],
    },
  },
};

export default item;
