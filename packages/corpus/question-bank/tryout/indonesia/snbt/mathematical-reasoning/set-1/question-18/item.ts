import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "loyalty-card",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Dalam setiap $$10$$ pesanan berturut-turut seorang pelanggan, pasti ada satu cangkir gratis.",
        },
        {
          column: 1,
          label:
            "Pelanggan baru yang memesan $$10$$ cangkir, semuanya pada hari Rabu, membayar $$\\text{Rp}65{.}000{,}00$$ lebih sedikit daripada pelanggan baru yang memesan $$10$$ cangkir, semuanya pada hari Senin.",
        },
        {
          column: 2,
          label: "Cangkir keenam seorang pelanggan baru tidak mungkin gratis.",
        },
        {
          column: 2,
          label:
            "Pelanggan baru yang memesan satu cangkir setiap hari mulai hari Kamis mendapat cangkir gratis pertamanya pada hari Rabu.",
        },
      ],
    },
  },
};

export default item;
