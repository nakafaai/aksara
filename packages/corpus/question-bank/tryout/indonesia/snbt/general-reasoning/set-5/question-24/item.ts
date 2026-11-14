import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "kuota",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Bagi pelanggan yang tidak pernah memakai internet pada jam malam, harga per GB kuota yang dapat dipakainya lebih murah pada Paket Sedang daripada pada Paket Besar.",
        },
        {
          column: 1,
          label:
            "Jika seluruh kuota dihitung, harga per GB Paket Malam kurang dari separuh harga per GB Paket Besar.",
        },
        {
          column: 1,
          label:
            "Bagian kuota malam dari seluruh kuota lebih besar pada Paket Sedang daripada pada Paket Besar.",
        },
        {
          column: 2,
          label:
            "Dua Paket Sedang lebih murah daripada satu Paket Besar dan memberi kuota utama yang lebih banyak.",
        },
      ],
    },
  },
};

export default item;
