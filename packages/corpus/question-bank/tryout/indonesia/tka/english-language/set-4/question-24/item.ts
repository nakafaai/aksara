import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "supporting-detail",
  },
  stimulus: "shade-trees",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The measurements were taken at 1 p.m. on a single clear day in September.",
        },
        {
          correct: true,
          label:
            "Shade lowered asphalt by $$19$$ degrees and concrete by $$15$$, but grass by only $$7$$.",
        },
        {
          correct: false,
          label:
            "Asphalt in full sun was the hottest of all the surfaces that were measured.",
        },
        {
          correct: false,
          label:
            "Some large trees already grow along Jalan Melati, where the office took its measurements.",
        },
        {
          correct: false,
          label:
            "The concrete sidewalk measured $$32$$ degrees under the trees at the time of the test.",
        },
      ],
    },
  },
};

export default item;
