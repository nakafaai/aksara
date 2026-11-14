import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$5\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt{34}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{13}\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$\\sqrt7\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$10\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
