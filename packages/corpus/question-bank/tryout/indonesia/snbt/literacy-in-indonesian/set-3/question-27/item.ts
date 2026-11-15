import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "anchoring-price",
  versions: {
    id: {
      columns: ["Ya", "Tidak"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dibandingkan dengan kelompok ketiga, rata-rata harga di kelompok kedua naik lebih banyak daripada turunnya rata-rata harga di kelompok pertama.",
        },
        {
          column: 2,
          label:
            "Sebagian besar siswa di kelompok kedua bersedia membayar lebih dari Rp$$100{.}000$$.",
        },
        {
          column: 1,
          label:
            "Selisih antara kelompok kedua dan kelompok ketiga lebih besar jika diukur dengan rata-rata daripada dengan median.",
        },
        {
          column: 2,
          label:
            "Karena pembagian kelompoknya acak, data menunjukkan bahwa angka Rp$$160{.}000$$ menaikkan harga yang bersedia dibayar setiap siswa sebesar Rp$$40{.}000$$.",
        },
        {
          column: 1,
          label:
            "Median harga di kelompok pertama Rp$$15{.}000$$ lebih rendah daripada median di kelompok ketiga.",
        },
      ],
    },
  },
};

export default item;
