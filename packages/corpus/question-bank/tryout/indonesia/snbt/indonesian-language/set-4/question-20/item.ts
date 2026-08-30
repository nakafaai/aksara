import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang tur bangunan bersejarah",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam tur bangunan bersejarah",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap triangulasi di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap tur bangunan bersejarah",
        },
        {
          isCorrect: true,
          label: "Membaca Dua Sumber tentang tur bangunan bersejarah",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
