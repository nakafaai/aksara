import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang klub pembaca pemula",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam klub pembaca pemula",
        },
        {
          isCorrect: true,
          label: "Pembatas buku kosong di klub pembaca pemula",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap perkembangan tokoh di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap klub pembaca pemula",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
