import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Keluaran Air sebagai Satu-satunya Ukuran Infiltrasi",
        },
        {
          isCorrect: false,
          label: "Campuran Organik yang Selalu Menghambat Air Masuk",
        },
        {
          isCorrect: false,
          label: "Kolom Pasir sebagai Salinan Semua Lahan Berpasir",
        },
        {
          isCorrect: false,
          label: "Mengabaikan Air yang Tersimpan di Dalam Tanah",
        },
        {
          isCorrect: true,
          label: "Membedakan Infiltrasi, Perkolasi, dan Penyimpanan Air",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
