import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "**Ruangan** itu dibersihkan kemarin.",
        },
        {
          correct: false,
          label: "**Tarian** itu dimulai siang hari.",
        },
        {
          correct: true,
          label: "**Tulisan** itu akan segera diterbitkan.",
        },
        {
          correct: false,
          label: "Ia mendengar **panggilan** dari arah belakang.",
        },
        {
          correct: false,
          label: "Ia memakai **timbangan** untuk menakar tepung.",
        },
      ],
    },
  },
};

export default item;
