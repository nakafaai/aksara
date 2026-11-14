import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "concrete-mix",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Seandainya semen boleh ditakar dari sak yang sudah dibuka sehingga setiap adukan mengisi molen sampai penuh, banyak adukan untuk lantai garasi kurang dari $$17$$.",
        },
        {
          column: 1,
          label:
            "Jika perbandingan diubah menjadi $$1:3:4$$, adukan dengan satu sak semen masih muat di molen.",
        },
        {
          column: 2,
          label:
            "Kerikil yang harus disiapkan untuk lantai garasi, termasuk cadangan, lebih dari $$1{,}7\\text{ m}^3$$.",
        },
        {
          column: 2,
          label:
            "Jika cadangan $$10\\%$$ ditiadakan, banyak sak semen untuk lantai garasi berkurang tepat $$10\\%$$.",
        },
      ],
    },
  },
};

export default item;
