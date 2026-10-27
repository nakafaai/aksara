import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Direktur membatalkan kedua program pada tahun ini.",
        },
        {
          correct: true,
          label: "PT Batik menjual produk baru pada tahun ini.",
        },
        {
          correct: false,
          label: "Direktur menunda kedua program sampai izin selesai.",
        },
        {
          correct: false,
          label: "PT Batik tidak menjual produk baru pada tahun ini.",
        },
        {
          correct: false,
          label: "Izin pembukaan cabang selesai pada tahun ini.",
        },
      ],
    },
  },
};

export default item;
