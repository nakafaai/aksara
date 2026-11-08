import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt{41}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$21\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$25\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$27\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$29\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$41\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
