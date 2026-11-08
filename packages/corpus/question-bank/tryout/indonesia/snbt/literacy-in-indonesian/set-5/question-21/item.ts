import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "electric-cars",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Penjualan mobil listrik pribadi naik tajam setelah insentif pajak untuk pembelinya diberlakukan.",
        },
        {
          correct: false,
          label:
            "Biaya perawatan mobil listrik lebih rendah daripada biaya perawatan mobil bensin.",
        },
        {
          correct: true,
          label:
            "Subsidi bus listrik menurunkan emisi per rupiah lebih banyak daripada subsidi mobil.",
        },
        {
          correct: false,
          label:
            "Sebagian besar pembeli mobil listrik pribadi tinggal di kota-kota besar.",
        },
        {
          correct: false,
          label:
            "Pembangkit batu bara di negara itu mungkin ditutup dalam beberapa tahun ke depan.",
        },
      ],
    },
  },
};

export default item;
