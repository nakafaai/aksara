import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "rainfall-harvest",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Hasil per hektare Sukamaju pada 2023 lebih tinggi daripada pada 2022.",
        },
        {
          column: 2,
          label:
            "Produksi padi ketiga kabupaten bersama-sama turun lebih dari seperempat dari 2022 ke 2023.",
        },
        {
          column: 2,
          label:
            "Sawah di kabupaten dengan irigasi teknis paling luas tidak kehilangan luas panen pada 2023.",
        },
        {
          column: 2,
          label:
            "Dalam ribu hektare, luas panen Banyulor turun lebih banyak daripada luas panen Ciranda.",
        },
      ],
    },
  },
};

export default item;
