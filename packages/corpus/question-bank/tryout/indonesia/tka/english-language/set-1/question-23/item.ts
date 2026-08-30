import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every family follows the same morning routine.",
        },
        {
          isCorrect: true,
          label:
            "Connected routines may create problems that a meeting does not predict.",
        },
        {
          isCorrect: false,
          label: "One survey answer is enough to define success.",
        },
        {
          isCorrect: false,
          label: "Sports practice is unrelated to school time.",
        },
        {
          isCorrect: false,
          label: "Averages always reveal smaller-group problems.",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
