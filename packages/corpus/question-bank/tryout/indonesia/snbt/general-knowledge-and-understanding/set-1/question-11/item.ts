import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "ketidakjelasan.",
        },
        {
          correct: false,
          label: "kepastian.",
        },
        {
          correct: false,
          label: "ketepatwaktuan.",
        },
        {
          correct: false,
          label: "keanekaragaman.",
        },
        {
          correct: false,
          label: "keseragaman.",
        },
      ],
    },
  },
};

export default item;
