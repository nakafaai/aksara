import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "hewan yang dimangsa.",
        },
        {
          correct: false,
          label: "hewan kecil yang dimakan oleh hewan lainnya.",
        },
        {
          correct: false,
          label: "serangga kecil.",
        },
        {
          correct: true,
          label: "hewan pemangsa hewan lainnya.",
        },
        {
          correct: false,
          label: "serangga dan hewan kecil lainnya.",
        },
      ],
    },
  },
};

export default item;
