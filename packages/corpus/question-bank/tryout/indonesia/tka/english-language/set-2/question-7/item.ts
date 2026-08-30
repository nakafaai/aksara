import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The class canceled the fair because every sign was missing.",
        },
        {
          isCorrect: false,
          label: "Only the robotics display was open to visitors.",
        },
        {
          isCorrect: false,
          label: "The rain made all accessibility planning unnecessary.",
        },
        {
          isCorrect: false,
          label: "The writer designed a perfect route without feedback.",
        },
        {
          isCorrect: true,
          label:
            "Repeated route testing revealed barriers and improved the fair, while exposing remaining problems.",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
