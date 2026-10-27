import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2\\sqrt[3]{2}:1$$",
        },
        {
          correct: true,
          label: "$$\\sqrt[3]{4}:1$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{2}:2$$",
        },
        {
          correct: false,
          label: "$$2:\\sqrt[3]{4}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt[3]{3}:1$$",
        },
      ],
    },
  },
};

export default item;
