import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "regression-mean",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "sekitar $$51$$, karena tanpa kelas tambahan nilai mereka diperkirakan tetap naik sekitar $$6$$ poin seperti kelompok pembanding",
        },
        {
          correct: false,
          label:
            "tetap $$45$$, karena tanpa kelas tambahan nilai mereka tidak akan berubah",
        },
        {
          correct: false,
          label:
            "sekitar $$55$$, karena seluruh kenaikan $$10$$ poin disebabkan oleh regresi ke rata-rata",
        },
        {
          correct: false,
          label:
            "sekitar $$41$$, karena nilai mereka akan turun seperti nilai kelompok bernilai tertinggi",
        },
        {
          correct: false,
          label:
            "sekitar $$52$$, sama dengan nilai tes kedua kelompok pembanding",
        },
      ],
    },
  },
};

export default item;
