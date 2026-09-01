import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Dua Puluh Empat Lampu yang Pasti Menyala Setiap Malam",
        },
        {
          isCorrect: false,
          label: "Tiga Buku Harian sebagai Suara Seluruh Kampung",
        },
        {
          isCorrect: true,
          label: "Membaca Peta Lampu dan Pengalaman Malam Warga",
        },
        {
          isCorrect: false,
          label: "Mengapa Peta Resmi Tidak Berguna bagi Sejarah",
        },
        {
          isCorrect: false,
          label: "Penerangan yang Merata di Semua Jalan Kampung",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
