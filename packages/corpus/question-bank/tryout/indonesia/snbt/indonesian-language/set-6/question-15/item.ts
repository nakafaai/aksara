import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang program teman belajar",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam program teman belajar",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam program teman belajar",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap dukungan sebaya di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap program teman belajar",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
