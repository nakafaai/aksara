import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang periode ayunan bandul",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam periode ayunan bandul",
        },
        {
          isCorrect: true,
          label:
            "Menguji tali sepanjang 60 sentimeter dalam periode ayunan bandul",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap periode di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap periode ayunan bandul",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
