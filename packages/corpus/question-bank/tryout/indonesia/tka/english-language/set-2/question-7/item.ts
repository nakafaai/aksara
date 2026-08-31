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
          label:
            "The class postponed the fair until the originally planned route could be restored.",
        },
        {
          isCorrect: true,
          label:
            "Repeated route testing revealed barriers and improved the fair, while exposing remaining problems.",
        },
        {
          isCorrect: false,
          label:
            "The class focused its revisions on the robotics display because it received the most visitors.",
        },
        {
          isCorrect: false,
          label:
            "The rain showed that accessibility planning was mainly useful in dry weather.",
        },
        {
          isCorrect: false,
          label:
            "The writer considered the first route adequate because it followed the shortest path.",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
