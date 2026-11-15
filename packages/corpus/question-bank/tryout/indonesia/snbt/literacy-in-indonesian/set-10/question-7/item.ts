import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "plot-function",
  },
  stimulus: "crossing-guard",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "sekitar $$17$$ tahun, dan di antaranya Rani menemukan potongan koran di laci ayahnya",
        },
        {
          correct: false,
          label:
            "sekitar $$17$$ tahun, dan di antaranya ayah Rani pulang dengan seragam basah",
        },
        {
          correct: false,
          label:
            "sekitar $$26$$ tahun, dan di antaranya Rani menemukan potongan koran di laci ayahnya",
        },
        {
          correct: false,
          label:
            "sekitar $$9$$ tahun, dan di antaranya engkol palang diganti tombol",
        },
        {
          correct: false,
          label:
            "sekitar $$17$$ tahun, dan di antaranya pengendara sepeda motor menerobos palang di perlintasan sebelah",
        },
      ],
    },
  },
};

export default item;
