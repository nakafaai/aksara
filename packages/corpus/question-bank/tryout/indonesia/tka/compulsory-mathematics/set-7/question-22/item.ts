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
            "Jika gaji setiap karyawan bagian desain naik $$25\\%$$ dan gaji setiap karyawan bagian jahit turun $$15\\%$$, rata-rata gaji seluruh karyawan naik.",
        },
        {
          column: 1,
          label:
            "Jika $$k$$ karyawan baru, masing-masing bergaji $$\\text{Rp}7{,}2\\text{ juta}$$, masuk ke bagian desain, rata-rata gaji seluruh karyawan paling sedikit $$\\text{Rp}6\\text{ juta}$$ tepat ketika $$k\\ge10$$.",
        },
        {
          column: 1,
          label:
            "Jika tiga karyawan bagian jahit yang masing-masing bergaji $$\\text{Rp}3\\text{ juta}$$ keluar, rata-rata gaji seluruh karyawan naik lebih dari $$\\text{Rp}0{,}4\\text{ juta}$$.",
        },
      ],
    },
  },
};

export default item;
