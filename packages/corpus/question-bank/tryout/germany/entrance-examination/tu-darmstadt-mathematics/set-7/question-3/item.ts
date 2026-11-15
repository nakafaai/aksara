import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    de: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$(12\\pi-9\\sqrt3)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$(12\\pi-18\\sqrt3)\\text{ cm}^2$$",
        },
        {
          correct: true,
          label: "$$(24\\pi-18\\sqrt3)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$24\\pi\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$(24\\pi-18)\\text{ cm}^2$$",
        },
        {
          correct: false,
          label: "$$(36\\pi-36\\sqrt3)\\text{ cm}^2$$",
        },
      ],
    },
  },
};

export default item;
