import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "reader-response",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Patience can prevent unnecessary repairs and repeated mistakes.",
        },
        {
          isCorrect: false,
          label: "Fast work is always more valuable than accurate work.",
        },
        {
          isCorrect: false,
          label: "Service notes make practical work less reliable.",
        },
        {
          isCorrect: false,
          label: "A mentor should never allow a learner to solve a problem.",
        },
        {
          isCorrect: false,
          label: "Similar-looking parts can always be exchanged safely.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
