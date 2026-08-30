import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Desa wisata" },
        {
          isCorrect: true,
          label: "Perkampungan yang terletak di pesisir pantai",
        },
        {
          isCorrect: false,
          label: "Laut yang menjadi objek wisata",
        },
        {
          isCorrect: false,
          label: "Proyek pemerintah yang sedang dibangun",
        },
        {
          isCorrect: false,
          label: "Pantai yang sedang ada perbaikan tanggul",
        },
      ],
    },
  },
};

export default item;
