import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  stimulus: "water-rota",
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
          label: "I, II, and V only",
        },
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: true,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "I, III, and IV only",
        },
      ],
    },
  },
};

export default item;
