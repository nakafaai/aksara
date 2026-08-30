import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang ruang arsip sekolah",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam ruang arsip sekolah",
        },
        {
          isCorrect: true,
          label: "Langkah Kecil Raka di ruang arsip sekolah",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap metakognisi di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap ruang arsip sekolah",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
