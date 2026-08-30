import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang kampung pada malam hujan",
        },
        {
          isCorrect: true,
          label: "Peta lampu jalan di kampung pada malam hujan",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam kampung pada malam hujan",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap akhir terbuka di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap kampung pada malam hujan",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
