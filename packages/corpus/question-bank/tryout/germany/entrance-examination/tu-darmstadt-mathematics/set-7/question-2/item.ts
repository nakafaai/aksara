import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$x=2$$ und $$x=3$$",
        },
        {
          correct: true,
          label: "$$x=-3$$, $$x=-2$$, $$x=2$$ und $$x=3$$",
        },
        {
          correct: false,
          label: "$$x=4$$ und $$x=9$$",
        },
        {
          correct: false,
          label: "$$x=-9$$, $$x=-4$$, $$x=4$$ und $$x=9$$",
        },
        {
          correct: false,
          label: "Die Gleichung hat keine reelle Lösung.",
        },
        {
          correct: false,
          label: "$$x=-2$$ und $$x=2$$",
        },
      ],
    },
  },
};

export default item;
