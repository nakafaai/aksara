import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Jawa Barat" },
        { correct: false, label: "Jawa Timur" },
        { correct: true, label: "Jawa Tengah" },
        {
          correct: false,
          label: "Nusa Tenggara Barat",
        },
        {
          correct: false,
          label: "Sulawesi Selatan",
        },
      ],
    },
  },
};

export default item;
