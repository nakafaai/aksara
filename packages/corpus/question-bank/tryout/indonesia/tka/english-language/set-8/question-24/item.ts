import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "class-cleaning",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Many students start to pick up after themselves without being told.",
        },
        {
          correct: false,
          label: "Sweeping the floor takes about six minutes on average.",
        },
        {
          correct: false,
          label:
            "Hiring two extra cleaners would cost about 60 million rupiah a year.",
        },
        {
          correct: false,
          label: "Toilets and gutters require equipment and training.",
        },
        {
          correct: false,
          label: "The duty team empties the bins before lessons start.",
        },
      ],
    },
  },
};

export default item;
