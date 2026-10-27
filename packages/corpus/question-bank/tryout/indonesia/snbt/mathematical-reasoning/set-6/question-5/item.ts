import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt[3]{2} : 1$$",
        },
        {
          correct: false,
          label: "$$1 : \\sqrt{2}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{2} : 1$$",
        },
        {
          correct: false,
          label: "$$1 : \\sqrt{3}$$",
        },
        {
          correct: true,
          label: "$$1 : \\sqrt[3]{2}$$",
        },
      ],
    },
  },
};

export default item;
