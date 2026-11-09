import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Proyek tanggul" },
        {
          correct: true,
          label: "Kampung Pesisir Werur",
        },
        { correct: false, label: "Tambrauw" },
        { correct: false, label: "Pantai" },
        {
          correct: false,
          label: "Kawasan pesisir Papua Barat Daya",
        },
      ],
    },
  },
};

export default item;
