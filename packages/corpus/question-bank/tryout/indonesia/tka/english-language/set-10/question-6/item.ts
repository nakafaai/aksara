import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  stimulus: "fun-run",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: true,
          label: "I, II, and V only",
        },
        {
          correct: false,
          label: "I, II, III, and V only",
        },
        {
          correct: false,
          label: "II and V only",
        },
        {
          correct: false,
          label: "I, II, IV, and V only",
        },
      ],
    },
  },
};

export default item;
