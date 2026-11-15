import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$30\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$26\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(13+\\sqrt{481})\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$5\\sqrt{13}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$(13+2\\sqrt{13})\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$(13+5\\sqrt{13})\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
