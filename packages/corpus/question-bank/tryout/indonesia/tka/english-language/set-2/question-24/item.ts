import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "To require a full investigation even when a claim has little consequence",
        },
        {
          isCorrect: true,
          label:
            "To argue that source checking should be taught repeatedly across subjects",
        },
        {
          isCorrect: false,
          label:
            "To limit source checking to web pages rather than graphs and quotations",
        },
        {
          isCorrect: false,
          label:
            "To teach students to suspend acceptance until several experts agree",
        },
        {
          isCorrect: false,
          label:
            "To concentrate source-checking instruction in a separate annual workshop",
        },
      ],
    },
  },
  stimulusKey: "source-checking",
};

export default item;
