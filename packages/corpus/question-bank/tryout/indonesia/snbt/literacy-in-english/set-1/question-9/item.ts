import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-structure",
  },
  stimulus: "parking-minimums",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "a deliberate strategy by car makers to raise their sales.",
        },
        {
          correct: false,
          label:
            "a temporary inconvenience that ends once construction is finished.",
        },
        {
          correct: false,
          label: "a benefit for cyclists that planners had not expected.",
        },
        {
          correct: true,
          label:
            "an unintended effect that works against the purpose of the rule.",
        },
        {
          correct: false,
          label: "a contradiction in the reasoning of the critics of reform.",
        },
      ],
    },
  },
};

export default item;
