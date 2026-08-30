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
          isCorrect: false,
          label: "The first meeting place should never be used.",
        },
        {
          isCorrect: true,
          label: "Nearby streets may be closed during the same emergency.",
        },
        {
          isCorrect: false,
          label: "Children must travel alone to another town.",
        },
        {
          isCorrect: false,
          label: "Paper cards only work far from home.",
        },
        {
          isCorrect: false,
          label: "Local contacts cannot receive any message.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
