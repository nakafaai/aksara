import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Direktur membatalkan kedua program pada tahun ini.",
        },
        {
          isCorrect: true,
          label: "PT Batik menjual produk baru pada tahun ini.",
        },
        {
          isCorrect: false,
          label: "Direktur menunda kedua program sampai izin selesai.",
        },
        {
          isCorrect: false,
          label: "PT Batik tidak menjual produk baru pada tahun ini.",
        },
        {
          isCorrect: false,
          label: "Izin pembukaan cabang selesai pada tahun ini.",
        },
      ],
    },
  },
};

export default item;
