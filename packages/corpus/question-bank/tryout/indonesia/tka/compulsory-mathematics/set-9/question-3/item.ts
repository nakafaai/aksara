import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cookie-recipe",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Perbandingan berat mentega dan berat tepung terigu pada resep itu adalah $$1:2$$.",
        },
        {
          column: 2,
          label:
            "Berat gula halus kurang dari $$15\\,\\%$$ dari jumlah berat tepung terigu, mentega, dan gula halus.",
        },
        {
          column: 1,
          label:
            "Untuk membuat $$36$$ kue kering diperlukan $$3$$ butir telur.",
        },
        {
          column: 2,
          label:
            "Dengan $$1$$ kg tepung terigu dan bahan lain yang cukup, dapat dibuat lebih dari $$80$$ kue kering.",
        },
      ],
    },
  },
};

export default item;
