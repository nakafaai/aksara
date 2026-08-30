import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Langkah Kecil Laras di jalur wisata hutan kota",
        },
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang jalur wisata hutan kota",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam jalur wisata hutan kota",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap kesadaran penuh di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap jalur wisata hutan kota",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
