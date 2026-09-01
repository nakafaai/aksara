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
            "Keep equipment in service whenever any repair remains technically possible.",
        },
        {
          isCorrect: false,
          label: "Safety guards may be removed to reduce cost.",
        },
        {
          isCorrect: false,
          label:
            "Assess repair cost without comparing the safety of available replacements.",
        },
        {
          isCorrect: true,
          label:
            "Repeated failures across identical items reveal a design problem.",
        },
        {
          isCorrect: false,
          label:
            "Treat avoiding a new purchase as sufficient evidence of a lower environmental cost.",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
