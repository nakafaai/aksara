import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To block the entrance lane",
        },
        {
          isCorrect: false,
          label: "To hide the lower clips",
        },
        {
          isCorrect: false,
          label: "To warm the soup pots",
        },
        {
          isCorrect: true,
          label: "To let damp air move behind them",
        },
        {
          isCorrect: false,
          label: "To cover the central drain",
        },
      ],
    },
  },
  stimulusKey: "rain-market",
};

export default item;
