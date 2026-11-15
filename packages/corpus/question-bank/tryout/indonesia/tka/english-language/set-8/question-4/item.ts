import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  stimulus: "clinic-queue",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "I, II, and III only",
        },
        {
          correct: false,
          label: "I and II only",
        },
        {
          correct: false,
          label: "I, II, III, and IV only",
        },
        {
          correct: false,
          label: "II and III only",
        },
        {
          correct: false,
          label: "I, II, and V only",
        },
      ],
    },
  },
};

export default item;
