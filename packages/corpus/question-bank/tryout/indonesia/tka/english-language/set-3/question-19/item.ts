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
          isCorrect: true,
          label:
            "Return to the focused question and invite another perspective.",
        },
        {
          isCorrect: false,
          label: "End the discussion and declare them winners.",
        },
        {
          isCorrect: false,
          label:
            "Require invited speakers to respond so the participation count increases.",
        },
        {
          isCorrect: false,
          label: "Delete the written revision step.",
        },
        {
          isCorrect: false,
          label:
            "Ask the two dominant speakers to judge whether the process was fair.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
