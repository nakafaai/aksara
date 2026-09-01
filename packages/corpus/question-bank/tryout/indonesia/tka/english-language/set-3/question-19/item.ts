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
            "Respect the pass, return to the focused question, and invite another perspective.",
        },
        {
          isCorrect: false,
          label:
            "Require the invited student to answer so every participant reaches the same turn count.",
        },
        {
          isCorrect: false,
          label:
            "Let the two dominant students continue because the first invitation did not produce an answer.",
        },
        {
          isCorrect: false,
          label:
            "End the discussion and use the participation list to declare the most active speaker the winner.",
        },
        {
          isCorrect: false,
          label:
            "Remove the right to pass from the next invitation so a different voice must enter.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
