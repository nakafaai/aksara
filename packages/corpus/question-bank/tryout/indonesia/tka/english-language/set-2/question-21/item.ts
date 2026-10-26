import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  stimulus: "source-checking",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To require a full investigation even when a claim has little consequence",
        },
        {
          correct: true,
          label:
            "To argue that source checking should be taught repeatedly across subjects",
        },
        {
          correct: false,
          label:
            "To limit source checking to web pages rather than graphs and quotations",
        },
        {
          correct: false,
          label:
            "To teach students to suspend acceptance until several experts agree",
        },
        {
          correct: false,
          label:
            "To concentrate source-checking instruction in a separate annual workshop",
        },
      ],
    },
  },
};

export default item;
