import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "inductive-reasoning",
    topic: "weakening",
  },
  stimulus: "tambak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Benur lemah ditebar di semua petak yang kelompoknya mencatat rata-rata kematian di atas $$25\\%$$ pada siklus terakhir.",
        },
        {
          correct: false,
          label:
            "Benur lemah ditebar di semua petak yang kelompoknya mencatat rata-rata kematian di bawah $$25\\%$$ pada siklus lalu.",
        },
        {
          correct: false,
          label:
            "Benur lemah ditebar di semua petak yang kelompoknya mengalami kenaikan rata-rata kematian paling kecil.",
        },
        {
          correct: true,
          label:
            "Benur lemah hanya ditebar di petak yang kelompoknya mencatat rata-rata kematian paling tinggi pada siklus lalu.",
        },
        {
          correct: false,
          label:
            "Benur lemah ditebar di semua petak dengan porsi yang sama untuk setiap petak.",
        },
      ],
    },
  },
};

export default item;
