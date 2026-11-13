import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cetak",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Jika dua pesanan yang masing-masing kurang dari $$500$$ lembar digabung menjadi satu pesanan tanpa lembar tambahan, total biaya cetaknya pasti lebih murah daripada jika keduanya dipesan terpisah.",
        },
        {
          column: 1,
          label:
            "Di antara kebutuhan $$n=1,2,\\ldots,499$$ lembar, tepat ada $$163$$ nilai $$n$$ yang biaya termurahnya lebih kecil daripada biaya memesan tepat $$n$$ lembar.",
        },
        {
          column: 1,
          label:
            "Biaya termurah untuk kebutuhan berapa pun yang kurang dari $$500$$ lembar tidak pernah melebihi $$\\text{Rp}150{.}000$$.",
        },
      ],
    },
  },
};

export default item;
