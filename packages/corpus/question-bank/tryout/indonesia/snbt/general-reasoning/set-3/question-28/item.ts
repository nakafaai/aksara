import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "cost-comparison",
  },
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Pada pemakaian $$20\\text{ m}^3$$, rata-rata biaya per $$\\text{m}^3$$ dengan paket bertingkat kurang dari $$\\text{Rp}4{.}000$$.",
        },
        {
          column: 2,
          label:
            "Untuk setiap pemakaian sampai dengan $$30\\text{ m}^3$$, paket bertingkat lebih murah daripada paket tetap.",
        },
        {
          column: 2,
          label:
            "Jika pemakaian turun dari $$35\\text{ m}^3$$ menjadi $$30\\text{ m}^3$$, lalu naik lagi menjadi $$35\\text{ m}^3$$, persentase kenaikan tagihan paket bertingkat sama dengan persentase penurunannya.",
        },
        {
          column: 1,
          label:
            "Dengan paket bertingkat, total tagihan dua bulan dengan pemakaian $$20\\text{ m}^3$$ dan $$40\\text{ m}^3$$ lebih besar daripada total tagihan dua bulan dengan pemakaian $$30\\text{ m}^3$$ setiap bulan.",
        },
      ],
    },
  },
};

export default item;
