import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$5\\sqrt8$$",
        },
        {
          correct: true,
          label: "$$5\\sqrt{10}$$",
        },
        {
          correct: false,
          label: "$$10\\sqrt3$$",
        },
        {
          correct: false,
          label: "$$5\\sqrt{13}$$",
        },
      ],
    },
  },
};

export default item;
