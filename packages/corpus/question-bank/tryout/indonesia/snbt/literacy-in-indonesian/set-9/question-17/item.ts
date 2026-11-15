import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "tutoring-scores",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "selisih nilai Februari kedua kelompok di tabel pertama, yaitu $$10$$ poin",
        },
        {
          correct: false,
          label:
            "selisih nilai Agustus kedua kelompok di tabel pertama, yaitu $$7$$ poin",
        },
        {
          correct: false,
          label:
            "selisih kenaikan kedua kelompok di tabel pertama, yaitu $$3$$ poin",
        },
        {
          correct: true,
          label:
            "selisih kenaikan kedua kelompok di tabel kedua, yaitu $$2$$ poin",
        },
        {
          correct: false,
          label:
            "nilai Februari kelompok yang ikut bimbingan di tabel kedua, yaitu $$73$$",
        },
      ],
    },
  },
};

export default item;
