import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Benang merah di kelas reparasi pakaian",
        },
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang kelas reparasi pakaian",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam kelas reparasi pakaian",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap konflik di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap kelas reparasi pakaian",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
