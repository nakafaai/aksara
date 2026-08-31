import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mengubah Semua Catatan Sumur Menjadi Meter",
        },
        {
          isCorrect: false,
          label: "Formulir Baru yang Menyamakan Setiap Kedalaman Air",
        },
        {
          isCorrect: false,
          label: "Pendapat Warga sebagai Pengganti Uji Keterbandingan",
        },
        {
          isCorrect: false,
          label: "Menghapus Nilai Asli setelah Konversi Satuan",
        },
        {
          isCorrect: true,
          label: "Perbandingan Catatan Sumur tanpa Menghapus Jejak Asli",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
