import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "serangga.",
        },
        {
          correct: false,
          label: "hewan kecil.",
        },
        {
          correct: false,
          label: "mangsa kelelawar.",
        },
        {
          correct: false,
          label: "serangga dan hewan kecil.",
        },
        {
          correct: true,
          label: "kelelawar.",
        },
      ],
    },
  },
};

export default item;
