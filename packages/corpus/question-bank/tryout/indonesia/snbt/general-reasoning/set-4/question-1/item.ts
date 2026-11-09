import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "conclusion",
  },
  stimulus: "lampu",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Lampu natrium sama sekali tidak menarik serangga.",
        },
        {
          correct: false,
          label:
            "Penggantian lampu menjadi LED membuat populasi serangga di kota meningkat.",
        },
        {
          correct: false,
          label:
            "Penutup penyaring cahaya biru menghemat listrik lebih banyak daripada lampu LED tanpa penutup.",
        },
        {
          correct: true,
          label:
            "Lampu LED putih menarik lebih banyak serangga terutama karena cahaya biru yang dipancarkannya.",
        },
        {
          correct: false,
          label:
            "Kelelawar menyebabkan serangga berkumpul di sekitar lampu LED.",
        },
      ],
    },
  },
};

export default item;
