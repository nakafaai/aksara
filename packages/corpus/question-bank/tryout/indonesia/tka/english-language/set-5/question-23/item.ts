import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "phone-free-lunch",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The survey proves that phones cause students to feel tired.",
        },
        {
          correct: true,
          label:
            "More students felt rested after lunch in week 2 than in week 1.",
        },
        {
          correct: false,
          label:
            "Students in week 2 were not the same students who answered in week 1.",
        },
        {
          correct: true,
          label:
            "The results are based on what students reported about themselves.",
        },
      ],
    },
  },
};

export default item;
