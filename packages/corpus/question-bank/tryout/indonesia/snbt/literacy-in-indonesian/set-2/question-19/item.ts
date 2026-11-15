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
            "Ia memakai harga rata-rata seluruh ikan, yang turun karena komposisi berubah, padahal harga setiap jenis justru naik.",
        },
        {
          correct: false,
          label:
            "Ia memakai harga rata-rata seluruh ikan, padahal seharusnya memakai nilai lelang total yang naik Rp$$200$$ juta.",
        },
        {
          correct: false,
          label:
            "Ia salah menghitung harga rata-rata, karena rata-rata yang benar adalah rata-rata biasa dari ketiga harga per kilogram.",
        },
        {
          correct: false,
          label:
            "Ia hanya melihat dua bulan, padahal harga ikan baru dapat dinilai setelah satu tahun penuh.",
        },
        {
          correct: false,
          label:
            "Ia mengabaikan bahwa harga kembung naik paling kecil, sehingga hanya nelayan kembung yang dirugikan.",
        },
      ],
    },
  },
};

export default item;
