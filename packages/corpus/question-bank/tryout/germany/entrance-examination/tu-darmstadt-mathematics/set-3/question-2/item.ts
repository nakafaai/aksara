import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$x=-7$$",
        },
        {
          correct: false,
          label: "$$x=-1$$",
        },
        {
          correct: false,
          label: "$$x=1$$",
        },
        {
          correct: false,
          label: "$$x=7$$",
        },
        {
          correct: false,
          label: "$$x=8$$",
        },
        {
          correct: false,
          label: "Die Gleichung hat keine Lösung.",
        },
      ],
    },
  },
};

export default item;
