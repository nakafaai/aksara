import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "main-idea-purpose",
  },
  stimulus: "orange-float",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: false,
          label: "I, II, III, and IV",
        },
        {
          correct: false,
          label: "II, III, and IV only",
        },
        {
          correct: true,
          label: "I, II, and III only",
        },
      ],
    },
  },
};

export default item;
