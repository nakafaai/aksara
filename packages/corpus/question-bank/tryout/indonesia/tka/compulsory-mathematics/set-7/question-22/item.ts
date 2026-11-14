import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "gaji",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika gaji setiap karyawan bagian desain naik $$25\\%$$, rata-rata gaji seluruh karyawan naik lebih dari $$\\text{Rp}0{,}5\\text{ juta}$$.",
        },
        {
          column: 1,
          label:
            "Jika $$10$$ karyawan baru dengan gaji masing-masing $$\\text{Rp}7{,}2\\text{ juta}$$ masuk ke bagian desain, rata-rata gaji seluruh karyawan menjadi $$\\text{Rp}6\\text{ juta}$$.",
        },
        {
          column: 1,
          label:
            "Kenaikan gaji $$10\\%$$ untuk setiap karyawan bagian jahit menaikkan rata-rata gaji seluruh karyawan sama besar dengan kenaikan $$\\text{Rp}1{,}44\\text{ juta}$$ untuk setiap karyawan bagian desain.",
        },
      ],
    },
  },
};

export default item;
