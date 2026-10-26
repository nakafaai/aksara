import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Potret dari Sensus Pertanian Indonesia 2023",
        },
        {
          correct: false,
          label: "Perkembangan Pertanian Indonesia",
        },
        {
          correct: false,
          label: "Penurunan Usaha Pertanian Perorangan",
        },
        {
          correct: false,
          label: "Mengapa Indonesia Memerlukan Modernisasi Pertanian?",
        },
        {
          correct: false,
          label: "Sensus Pertanian 2023 Dilaksanakan di Seluruh Indonesia",
        },
      ],
    },
  },
};

export default item;
