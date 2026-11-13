import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "lari",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Rata-rata waktu kelas XI A lebih dari $$14{,}3$$ detik.",
        },
        {
          column: 2,
          label:
            "Pasti ada sedikitnya satu siswa kelas XI B yang berlari lebih cepat daripada Raka.",
        },
        {
          column: 1,
          label:
            "Pasti ada sedikitnya satu siswa kelas XI B yang waktunya lebih kecil daripada median waktu kelas XI A.",
        },
      ],
    },
  },
};

export default item;
