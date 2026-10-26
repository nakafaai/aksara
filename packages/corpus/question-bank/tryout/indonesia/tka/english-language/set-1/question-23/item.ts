import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "later-start",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "A single average can represent families because school schedules shape their mornings similarly.",
        },
        {
          correct: true,
          label:
            "Connected routines may create problems that a meeting does not predict.",
        },
        {
          correct: false,
          label: "One survey answer is enough to define success.",
        },
        {
          correct: false,
          label:
            "Sports practice can be excluded from the trial because it occurs after lessons.",
        },
        {
          correct: false,
          label:
            "The overall average is sufficient to show how each subgroup experienced the change.",
        },
      ],
    },
  },
};

export default item;
