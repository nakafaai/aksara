import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "kolam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kolam renang umum di kota-kota itu menyelenggarakan kelas renang gratis untuk anak-anak setiap minggu.",
        },
        {
          correct: false,
          label:
            "Biaya membangun satu kolam renang umum cukup tinggi bagi anggaran kota.",
        },
        {
          correct: false,
          label:
            "Kota Tepian memiliki lebih sedikit kolam renang umum daripada kota-kota tetangganya.",
        },
        {
          correct: false,
          label:
            "Sebagian besar kasus tenggelam di kota-kota itu terjadi pada musim hujan.",
        },
        {
          correct: true,
          label:
            "Kota-kota yang memiliki banyak kolam renang umum pada umumnya tidak dilalui sungai besar.",
        },
      ],
    },
  },
};

export default item;
