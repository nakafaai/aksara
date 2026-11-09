import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "evaluation",
  },
  stimulus: "musik",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Berapa harga roti tawar dan roti manis yang paling laris di toko Jalan Mawar sejak toko itu pertama dibuka?",
        },
        {
          correct: false,
          label:
            "Lagu apa saja yang diputar di toko Jalan Mawar selama bulan Oktober?",
        },
        {
          correct: true,
          label:
            "Apakah cabang lain yang tidak memutar musik juga mengalami kenaikan belanja dari September ke Oktober?",
        },
        {
          correct: false,
          label: "Berapa lama toko roti di Jalan Mawar sudah berdiri?",
        },
        {
          correct: false,
          label:
            "Apakah pengelola toko di Jalan Mawar menyukai musik bertempo lambat?",
        },
      ],
    },
  },
};

export default item;
