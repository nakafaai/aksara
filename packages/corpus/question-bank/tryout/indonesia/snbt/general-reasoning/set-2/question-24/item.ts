import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "data-interpretation",
  },
  stimulus: "meteran",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Jika pemakaian Keluarga Hasan pada suatu bulan $$20\\%$$ lebih sedikit daripada pemakaian Mei, tagihannya pada bulan itu turun kurang dari $$20\\%$$ dibandingkan tagihan Mei.",
        },
        {
          column: 2,
          label:
            "Jika biaya beban ikut dihitung, biaya rata-rata per kWh Keluarga Lestari pada Mei lebih rendah daripada biaya rata-rata per kWh Keluarga Hasan.",
        },
        {
          column: 2,
          label:
            "Pada Mei, pemakaian Keluarga Made kurang dari dua kali pemakaian Keluarga Hasan, tetapi tagihan Keluarga Made lebih dari dua kali tagihan Keluarga Hasan.",
        },
        {
          column: 1,
          label:
            "Tagihan Mei Keluarga Made lebih dari $$65\\%$$ lebih tinggi daripada tagihan Mei Keluarga Hasan.",
        },
      ],
    },
  },
};

export default item;
