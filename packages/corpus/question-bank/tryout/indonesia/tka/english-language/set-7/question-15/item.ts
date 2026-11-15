import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "narrative",
    topic: "realism-fantasy",
  },
  stimulus: "dark-lighthouse",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I, II, and V only",
        },
        {
          correct: true,
          label: "I, II, III, and V only",
        },
        {
          correct: false,
          label: "I, II, III, IV, and V",
        },
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "II, III, and V only",
        },
      ],
    },
  },
};

export default item;
