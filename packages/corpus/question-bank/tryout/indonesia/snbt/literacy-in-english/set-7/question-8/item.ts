import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "phone-ban",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "By about $$15\\%$$ of the old rate, which Text B says the ban alone caused.",
        },
        {
          correct: false,
          label:
            "By about $$9\\%$$ of the old rate, which Text B says could have come from any of three changes made that September.",
        },
        {
          correct: false,
          label:
            "By about $$13\\%$$ of the old rate, which Text B says could have come from any of three changes made that September.",
        },
        {
          correct: false,
          label:
            "By about $$15\\%$$ of the old rate, which Text B says is too small to matter.",
        },
        {
          correct: true,
          label:
            "By about $$15\\%$$ of the old rate, which Text B says could have come from any of three changes made that September.",
        },
      ],
    },
  },
};

export default item;
