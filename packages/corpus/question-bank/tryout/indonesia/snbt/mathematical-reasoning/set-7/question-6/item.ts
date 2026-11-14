import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "profit-sharing",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bagian Bima dari laba yang dibagi lebih besar daripada bagian Ayu, walaupun setoran awal Bima lebih kecil daripada setoran awal Ayu.",
        },
        {
          column: 2,
          label:
            "Jika laba bersih menjadi dua kali lipat, seluruh uang yang diterima Ayu, termasuk gajinya, juga menjadi dua kali lipat.",
        },
        {
          column: 2,
          label:
            "Seandainya Ayu tidak menarik modal pada awal April, bagian Citra dari laba yang dibagi tidak berubah karena modal Citra tetap $$\\text{Rp}90$$ juta.",
        },
        {
          column: 1,
          label:
            "Seandainya Citra bergabung pada awal April dengan setoran yang sama, bagian Citra menjadi lebih dari setengah laba yang dibagi.",
        },
      ],
    },
  },
};

export default item;
