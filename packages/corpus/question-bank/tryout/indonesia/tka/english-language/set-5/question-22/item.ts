import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "swim-lessons",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "74 of the 180 students who answered the survey could not swim 25 meters without stopping.",
        },
        {
          correct: false,
          label:
            "After the course, 26 volunteers could float on their back for one minute.",
        },
        {
          correct: false,
          label:
            "Swimming works the whole body and puts little strain on the knees.",
        },
        {
          correct: false,
          label: "The town pool is a ten-minute walk from the school.",
        },
        {
          correct: false,
          label:
            "The town pool offers school groups a lower price on weekday mornings.",
        },
      ],
    },
  },
};

export default item;
