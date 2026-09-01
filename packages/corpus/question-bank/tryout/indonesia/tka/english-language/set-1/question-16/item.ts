import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "classification",
  },
  responses: {
    en: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Choose a quiet period.",
        },
        {
          isCorrect: true,
          label: "Check whether essential equipment uses water.",
        },
        {
          isCorrect: false,
          label:
            "Start the irrigation once before the reading to verify that its timer works.",
        },
        {
          isCorrect: false,
          label: "Break a wall to find the pipe.",
        },
      ],
    },
  },
  stimulusKey: "leak-test",
};

export default item;
