import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "assumption",
  },
  stimulus: "musik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "semua pembeli toko roti menyukai musik bertempo lambat",
        },
        {
          correct: true,
          label:
            "kenaikan belanja pada bulan Oktober tidak disebabkan oleh perubahan lain dari September ke Oktober",
        },
        {
          correct: false,
          label:
            "pembeli yang berada lebih lama di toko selalu membeli roti yang lebih mahal",
        },
        {
          correct: false,
          label:
            "pegawai di semua cabang toko roti itu juga menyukai musik bertempo lambat yang diputar sepanjang hari kerja",
        },
        {
          correct: false,
          label:
            "harga roti di semua cabang tidak pernah berubah sejak toko itu dibuka",
        },
      ],
    },
  },
};

export default item;
