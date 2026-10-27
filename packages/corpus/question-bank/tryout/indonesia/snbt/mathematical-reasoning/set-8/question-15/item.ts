import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$10(\\sqrt{3}+1)$$",
        },
        {
          correct: false,
          label: "$$10(\\sqrt{6}-\\sqrt{2})$$",
        },
        {
          correct: true,
          label: "$$10(\\sqrt{6}+\\sqrt{2})$$",
        },
        {
          correct: false,
          label: "$$20\\sqrt{2}$$",
        },
        {
          correct: false,
          label: "$$20\\sqrt{3}$$",
        },
      ],
    },
  },
};

export default item;
