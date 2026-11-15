import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "dengue-cases",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada 2024, Cibeureum memiliki laju kasus tertinggi walaupun banyak kasusnya bukan yang terbanyak.",
        },
        {
          column: 2,
          label:
            "Pada 2024, warga Pasirjaya menghadapi risiko lebih besar daripada warga Karangtengah karena kasusnya lebih banyak.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh kasus kabupaten pada 2024 berasal dari dua kecamatan yang kasusnya paling banyak.",
        },
        {
          column: 2,
          label:
            "Kalau anggaran dibagi sebanding dengan laju kasus 2024, Kota Baru tetap mendapat bagian terbesar.",
        },
      ],
    },
  },
};

export default item;
