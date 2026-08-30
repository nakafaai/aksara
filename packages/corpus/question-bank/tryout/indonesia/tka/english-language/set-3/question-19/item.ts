import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "End the discussion and declare them winners.",
        },
        {
          isCorrect: false,
          label: "Remove the right to pass from everyone else.",
        },
        {
          isCorrect: true,
          label:
            "Return to the focused question and invite another perspective.",
        },
        {
          isCorrect: false,
          label: "Delete the written revision step.",
        },
        {
          isCorrect: false,
          label: "Allow only those two people to review the process.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
