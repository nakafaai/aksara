import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "algebra",
    topic: "functions",
  },
  stimulus: "online-taxi",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Untuk setiap jarak perjalanan, jika tarif di luar jam sibuk adalah $$F$$ rupiah, tarif pada jam sibuk untuk jarak yang sama adalah $$1{,}2F-2{.}000$$ rupiah.",
        },
        {
          column: 2,
          label:
            "Di luar jam sibuk, dua perjalanan yang jaraknya berbeda selalu mempunyai tarif yang berbeda.",
        },
        {
          column: 2,
          label:
            "Pada jam sibuk, setiap tambahan $$1\\text{ km}$$ setelah km ke-$$12$$ menambah tarif lebih banyak daripada setiap tambahan $$1\\text{ km}$$ di antara km ke-$$2$$ dan km ke-$$12$$ di luar jam sibuk.",
        },
        {
          column: 1,
          label:
            "Ada jarak $$d$$ sehingga tarif perjalanan $$d\\text{ km}$$ pada jam sibuk sama dengan tarif perjalanan $$(d+3)\\text{ km}$$ di luar jam sibuk.",
        },
      ],
    },
  },
};

export default item;
