import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "kantin",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pada minggu sesudah label, lebih dari $$40\\%$$ seluruh siswa sekolah membeli minuman tinggi gula.",
        },
        {
          column: 1,
          label:
            "Pada minggu sesudah label, seperenam pembeli minuman tinggi gula adalah siswa yang pada minggu sebelum label tidak membeli minuman tinggi gula.",
        },
        {
          column: 1,
          label:
            "Rata-rata banyak kemasan minuman tinggi gula yang dibeli setiap pembeli minuman tinggi gula sama pada kedua minggu.",
        },
        {
          column: 2,
          label:
            "Dari minggu sebelum ke minggu sesudah label, banyak kemasan minuman yang tidak tinggi gula naik dengan persentase yang sama dengan turunnya banyak kemasan minuman tinggi gula.",
        },
      ],
    },
  },
};

export default item;
