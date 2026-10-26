import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "prediction",
  },
  stimulus: "fair-discussion",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Respect the pass, return to the focused question, and invite another perspective.",
        },
        {
          correct: false,
          label:
            "Require the invited student to answer so every participant reaches the same turn count.",
        },
        {
          correct: false,
          label:
            "Let the two dominant students continue because the first invitation did not produce an answer.",
        },
        {
          correct: false,
          label:
            "End the discussion and use the participation list to declare the most active speaker the winner.",
        },
        {
          correct: false,
          label:
            "Remove the right to pass from the next invitation so a different voice must enter.",
        },
      ],
    },
  },
};

export default item;
