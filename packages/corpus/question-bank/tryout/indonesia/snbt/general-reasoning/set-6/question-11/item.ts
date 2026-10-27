import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Konsumsi melebihi produksi dalam negeri pada setiap tahun yang tercantum, dan impor menutup selisihnya.",
        },
        {
          correct: false,
          label: "Impor naik dan turun dari tahun ke tahun.",
        },
        {
          correct: false,
          label:
            "Produksi, konsumsi, dan impor bertambah dengan jumlah yang sama setiap tahun.",
        },
        {
          correct: false,
          label: "Konsumsi tertinggi terjadi pada tahun A.",
        },
        {
          correct: false,
          label:
            "Impor melebihi produksi dalam negeri pada setiap tahun yang tercantum.",
        },
      ],
    },
  },
};

export default item;
