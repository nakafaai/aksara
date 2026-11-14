import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "seedling-grid",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika baris-baris dibuat sejajar sisi $$15\\text{ m}$$ dan aturan lain tetap, banyak bibit paling banyak menjadi lebih besar.",
        },
        {
          column: 1,
          label:
            "Jika bibit dibeli dalam nampan berisi $$24$$ bibit untuk mengisi lahan sebanyak mungkin ditambah cadangan paling sedikit $$10\\%$$, Pak Darto perlu membeli paling sedikit $$13$$ nampan.",
        },
        {
          column: 1,
          label:
            "Jika panjang lahan dan saluran ditambah $$0{,}4\\text{ m}$$, setiap baris dapat memuat satu bibit lebih banyak.",
        },
        {
          column: 1,
          label:
            "Jika saluran air ditiadakan dan aturan lain tetap, banyak bibit paling banyak bertambah tepat $$28$$.",
        },
      ],
    },
  },
};

export default item;
