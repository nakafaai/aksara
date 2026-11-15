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
          correct: false,
          label:
            "sekitar $$12$$ poin, sama dengan kenaikan rata-rata seluruh siswa bimbingan",
        },
        {
          correct: true,
          label:
            "sekitar $$12{,}7$$ poin, dari sekitar $$62$$ menjadi sekitar $$74{,}7$$",
        },
        {
          correct: false,
          label:
            "sekitar $$11$$ poin, sama dengan kenaikan siswa bimbingan di tabel kedua",
        },
        {
          correct: false,
          label:
            "sekitar $$1$$ poin, yaitu selisih nilai Februari $$74$$ dan $$73$$",
        },
        {
          correct: false,
          label:
            "sekitar $$9$$ poin, sama dengan kenaikan siswa yang tidak ikut bimbingan",
        },
      ],
    },
  },
};

export default item;
