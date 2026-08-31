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
            "A single average can represent families because school schedules shape their mornings similarly.",
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
          label:
            "Sports practice can be excluded from the trial because it occurs after lessons.",
        },
        {
          isCorrect: false,
          label:
            "The overall average is sufficient to show how each subgroup experienced the change.",
        },
      ],
    },
  },
  stimulusKey: "later-start",
};

export default item;
