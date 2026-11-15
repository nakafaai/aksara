import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "bus-punctuality",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Southway ran more trips in total, so its on-time trips make up a bigger share of all trips.",
        },
        {
          correct: true,
          label:
            "Most of Southway's trips are rural, and rural trips run on time far more often for both operators.",
        },
        {
          correct: false,
          label:
            "Northline's rural trips run late more often than Southway's, which pulls its overall rate down.",
        },
        {
          correct: false,
          label:
            "The five-minute rule is easier to meet on rural roads, so Southway's drivers can afford to be less careful.",
        },
        {
          correct: false,
          label:
            "Urban trips count twice in the overall rate, which works against the operator with more urban routes.",
        },
      ],
    },
  },
};

export default item;
