import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "seed-jar",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I, II, IV, and V only",
        },
        {
          correct: false,
          label: "II, IV, and V only",
        },
        {
          correct: false,
          label: "I, II, III, IV, and V",
        },
        {
          correct: false,
          label: "I, IV, and V only",
        },
        {
          correct: false,
          label: "II and V only",
        },
      ],
    },
  },
};

export default item;
