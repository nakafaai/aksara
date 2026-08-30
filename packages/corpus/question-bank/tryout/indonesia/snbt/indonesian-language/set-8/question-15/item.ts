import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang pendataan sumur warga",
        },
        {
          isCorrect: false,
          label: "Alasan Mengabaikan Semua Bukti dalam pendataan sumur warga",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap keterbandingan di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam pendataan sumur warga",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap pendataan sumur warga",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
