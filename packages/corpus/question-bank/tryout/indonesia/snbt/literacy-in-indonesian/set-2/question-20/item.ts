import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kereta seremonial",
        },
        {
          correct: true,
          label: "Perbudakan dan kerja paksa",
        },
        {
          correct: false,
          label: "Kedai makanan siap saji Romawi",
        },
        {
          correct: false,
          label: "Lukisan dinding erotis",
        },
        {
          correct: false,
          label: "Kampanye pemilihan umum",
        },
      ],
    },
  },
};

export default item;
