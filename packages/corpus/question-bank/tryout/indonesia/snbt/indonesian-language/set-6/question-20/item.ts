import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang ruang penyimpanan karya seni",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam ruang penyimpanan karya seni",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap provenans di Seluruh Dunia",
        },
        {
          isCorrect: true,
          label: "Membaca Dua Sumber tentang ruang penyimpanan karya seni",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap ruang penyimpanan karya seni",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
