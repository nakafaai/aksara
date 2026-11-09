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
          correct: false,
          label: "P tampil pada sesi malam.",
        },
        {
          correct: false,
          label: "R tampil pada sesi malam.",
        },
        {
          correct: false,
          label: "U tampil pada sesi sore.",
        },
        {
          correct: false,
          label: "Q tampil pada hari Jumat.",
        },
        {
          correct: true,
          label: "T tampil pada sesi sore.",
        },
      ],
    },
  },
};

export default item;
