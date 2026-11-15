import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "clinic-queue",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It begins $$96$$ minutes earlier in the morning",
        },
        {
          correct: true,
          label: "It begins at the same time of the morning",
        },
        {
          correct: false,
          label: "It begins $$12$$ minutes later in the morning",
        },
        {
          correct: false,
          label: "It begins $$180$$ minutes earlier in the morning",
        },
        {
          correct: false,
          label: "It begins $$6$$ minutes earlier in the morning",
        },
      ],
    },
  },
};

export default item;
