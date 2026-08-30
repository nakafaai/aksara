import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang layanan perpustakaan keliling",
        },
        {
          isCorrect: true,
          label: "Keputusan Berbasis Bukti dalam layanan perpustakaan keliling",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam layanan perpustakaan keliling",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap data dasar di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap layanan perpustakaan keliling",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
