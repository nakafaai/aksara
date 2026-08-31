import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mantel M-17 yang Pasti Bertahan Selama Dua Puluh Satu Tahun",
        },
        {
          isCorrect: true,
          label: "Menelusuri Mantel Teater melalui Foto dan Catatan Perawatan",
        },
        {
          isCorrect: false,
          label: "Mengisi Celah Arsip dengan Kemiripan Visual",
        },
        {
          isCorrect: false,
          label: "Buku Perawatan sebagai Bukti Lengkap Penggunaan Panggung",
        },
        {
          isCorrect: false,
          label: "Foto Publikasi yang Lebih Netral daripada Catatan Internal",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
