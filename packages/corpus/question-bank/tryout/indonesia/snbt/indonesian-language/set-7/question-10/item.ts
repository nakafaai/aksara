import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kegunaan dan Batas Simulasi populasi dengan keping warna",
        },
        {
          isCorrect: false,
          label:
            "Kepastian Mutlak tentang simulasi populasi dengan keping warna",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam simulasi populasi dengan keping warna",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap daya dukung di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label:
            "Satu Aturan untuk Setiap simulasi populasi dengan keping warna",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
