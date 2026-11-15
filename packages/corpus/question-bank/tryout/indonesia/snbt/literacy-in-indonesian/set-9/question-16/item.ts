import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "tutoring-scores",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "sekitar $$10{,}2$$ poin, berada di antara kenaikan kedua kelompok, yaitu $$12$$ dan $$9$$ poin",
        },
        {
          correct: false,
          label:
            "sekitar $$10{,}5$$ poin, yaitu rata-rata biasa dari kenaikan $$12$$ dan $$9$$ poin",
        },
        {
          correct: false,
          label:
            "sekitar $$10$$ poin, yaitu selisih nilai Februari kedua kelompok",
        },
        {
          correct: false,
          label: "sekitar $$21$$ poin, yaitu jumlah kenaikan kedua kelompok",
        },
        {
          correct: false,
          label:
            "sekitar $$10{,}2$$ poin, lebih besar daripada kenaikan kedua kelompok",
        },
      ],
    },
  },
};

export default item;
