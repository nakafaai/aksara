import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "internet",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika bonus malam ikut dihitung, Paket Pelajar memiliki harga per GB paling murah.",
        },
        {
          column: 1,
          label:
            "Total kuota Paket Super, termasuk bonus malam, empat kali total kuota Paket Hemat, termasuk bonus malam.",
        },
        {
          column: 2,
          label:
            "Selisih harga Paket Super dan Paket Keluarga sama dengan harga Paket Hemat.",
        },
        {
          column: 1,
          label:
            "Kuota utama Paket Keluarga dua kali kuota utama Paket Pelajar, tetapi harganya kurang dari dua kali harga Paket Pelajar.",
        },
      ],
    },
  },
};

export default item;
