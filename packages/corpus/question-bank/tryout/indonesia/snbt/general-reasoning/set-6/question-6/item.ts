import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "explanation",
  },
  stimulus: "tangga",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Poster menarik perhatian saat masih baru, lalu karyawan terbiasa melihatnya dan kembali naik lift.",
        },
        {
          correct: false,
          label:
            "Jumlah karyawan di gedung itu bertambah setiap minggu sejak minggu ke-$$5$$.",
        },
        {
          correct: false,
          label:
            "Sebagian besar karyawan mulai bekerja dari rumah secara bergiliran pada minggu ke-$$5$$ sampai minggu ke-$$8$$.",
        },
        {
          correct: false,
          label:
            "Poster di depan pintu lift dicopot pada awal minggu ke-$$5$$.",
        },
        {
          correct: false,
          label:
            "Tangga baru yang lebih lebar dan lebih terang dibuka pada minggu ke-$$8$$.",
        },
      ],
    },
  },
};

export default item;
