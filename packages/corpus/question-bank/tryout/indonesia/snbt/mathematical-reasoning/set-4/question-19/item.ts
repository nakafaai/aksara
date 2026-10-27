import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$250\\sqrt{2}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$500\\sqrt{3}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$500\\sqrt{2}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$250\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$250\\sqrt{3}\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
