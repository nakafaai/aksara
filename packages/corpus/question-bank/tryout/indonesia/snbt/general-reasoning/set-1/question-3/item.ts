import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "inductive-reasoning",
    topic: "inference",
  },
  stimulus: "atap",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Selisih suhu pada rumah tanpa plafon lebih dari tiga kali selisih suhu pada rumah berplafon.",
        },
        {
          column: 2,
          label:
            "Data penelitian menunjukkan bahwa cat putih membuat suhu ruang utama lebih rendah sepanjang hari.",
        },
        {
          column: 2,
          label:
            "Tagihan listrik yang hampir sama menunjukkan bahwa penghuni rumah beratap putih tetap sering menyalakan kipas angin.",
        },
        {
          column: 1,
          label:
            "Sebagian rumah yang diteliti memiliki plafon, sedangkan sebagian lainnya tidak.",
        },
      ],
    },
  },
};

export default item;
