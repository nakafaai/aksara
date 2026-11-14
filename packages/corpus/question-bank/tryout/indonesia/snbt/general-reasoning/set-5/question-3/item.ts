import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-inference",
  },
  stimulus: "tongkol",
  versions: {
    id: {
      columns: ["Dapat disimpulkan", "Tidak dapat disimpulkan"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Hasil penjualan tongkol seluruh kelompok pada musim 2025 lebih rendah daripada pada musim 2024.",
        },
        {
          column: 2,
          label:
            "Seandainya rumpon tidak dipasang, tangkapan per trip perahu besar pada musim 2025 tetap $$100$$ kg.",
        },
        {
          column: 2,
          label:
            "Perahu kecil akan membawa pulang lebih dari $$40$$ kg tongkol per trip jika sanggup mencapai rumpon.",
        },
        {
          column: 1,
          label:
            "Pada musim 2025, penghasilan bersih semusim sebuah perahu besar masih lebih dari tiga kali penghasilan bersih semusim sebuah perahu kecil.",
        },
      ],
    },
  },
};

export default item;
