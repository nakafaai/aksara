import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "deductive-reasoning",
    topic: "scheduling",
  },
  stimulus: "pentas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "S tidak tampil pada hari Sabtu.",
        },
        {
          correct: false,
          label: "T tampil pada hari Sabtu.",
        },
        {
          correct: false,
          label: "Q tampil pada sesi sore.",
        },
        {
          correct: false,
          label: "P tampil pada sesi sore.",
        },
        {
          correct: false,
          label: "U tampil pada hari Minggu.",
        },
      ],
    },
  },
};

export default item;
