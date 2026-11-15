import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "fish-auction",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Alasannya lemah, karena harga per kilogram ketiga jenis ikan justru naik, dan rata-ratanya turun hanya karena porsi teri yang murah membesar.",
        },
        {
          correct: false,
          label:
            "Alasannya lemah, karena harga per kilogram ketiga jenis ikan justru naik, dan rata-ratanya turun karena ketua koperasi salah membagi nilai lelang dengan berat total.",
        },
        {
          correct: false,
          label:
            "Alasannya kuat, karena harga rata-rata memang turun dari Rp$$30{.}000$$ menjadi Rp$$28{.}000$$, dan teri yang paling banyak dijual harganya paling rendah.",
        },
        {
          correct: false,
          label:
            "Alasannya lemah, karena harga per kilogram ketiga jenis ikan justru naik, dan rata-ratanya turun karena setiap perahu menjual lebih sedikit ikan.",
        },
        {
          correct: false,
          label:
            "Alasannya lemah, karena harga per kilogram hanya naik untuk tongkol dan teri, sedangkan harga kembung justru turun.",
        },
      ],
    },
  },
};

export default item;
