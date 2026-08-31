import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "To check understanding before adding a response",
        },
        {
          isCorrect: false,
          label: "To prevent any new evidence from being shared",
        },
        {
          isCorrect: false,
          label: "To turn the participation list into a score",
        },
        {
          isCorrect: false,
          label:
            "To ask each speaker to restate the dominant view before offering a response",
        },
        {
          isCorrect: false,
          label: "To avoid defining the discussion question",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
