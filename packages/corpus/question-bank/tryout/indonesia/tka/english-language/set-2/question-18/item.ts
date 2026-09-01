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
          label: "Two meeting places",
        },
        {
          isCorrect: true,
          label: "An out-of-area contact",
        },
        {
          isCorrect: false,
          label: "Every medical detail shared with the out-of-area contact",
        },
        {
          isCorrect: false,
          label: "Unverified instructions for a medical device",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
