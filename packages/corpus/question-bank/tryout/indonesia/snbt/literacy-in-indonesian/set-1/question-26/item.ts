import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Desa wisata" },
        {
          correct: false,
          label: "Laut yang menjadi objek wisata",
        },
        {
          correct: true,
          label: "Perkampungan yang terletak di pesisir pantai",
        },
        {
          correct: false,
          label: "Proyek pemerintah yang sedang dibangun",
        },
        {
          correct: false,
          label: "Pantai yang sedang ada perbaikan tanggul",
        },
      ],
    },
  },
};

export default item;
