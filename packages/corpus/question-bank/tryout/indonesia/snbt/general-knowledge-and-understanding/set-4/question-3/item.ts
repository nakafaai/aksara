import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Prosedur lapangan disesuaikan saat cuaca berubah tanpa mengubah tujuan dan aturan ukur utama.",
        },
        {
          correct: false,
          label:
            "Metode menyediakan beberapa jalur pelaksanaan yang tetap tunduk pada kriteria hasil yang sama.",
        },
        {
          correct: false,
          label:
            "Setelah ada keluhan, tujuan utama dibatalkan dan diganti dengan hasil lain yang tidak berkaitan.",
        },
        {
          correct: false,
          label:
            "Peralatan diperiksa dan komponen aus diganti sebelum kegagalan terjadi.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan menurut urutan langkah yang direncanakan dan diulang dengan aturan yang sama.",
        },
      ],
    },
  },
};

export default item;
