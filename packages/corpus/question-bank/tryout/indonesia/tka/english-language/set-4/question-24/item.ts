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
          label:
            "The measurements were taken at 1 p.m. on a single clear day in September.",
        },
        {
          isCorrect: true,
          label:
            "Shade lowered asphalt by $$19$$ degrees and concrete by $$15$$, but grass by only $$7$$.",
        },
        {
          isCorrect: false,
          label:
            "Asphalt in full sun was the hottest of all the surfaces that were measured.",
        },
        {
          isCorrect: false,
          label:
            "Some large trees already grow along Jalan Melati, where the office took its measurements.",
        },
        {
          isCorrect: false,
          label:
            "The concrete sidewalk measured $$32$$ degrees under the trees at the time of the test.",
        },
      ],
    },
  },
  stimulusKey: "shade-trees",
};

export default item;
