import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "summary",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The class postponed the fair until the originally planned route could be restored.",
        },
        {
          correct: true,
          label:
            "Repeated route testing revealed barriers and improved the fair, while exposing remaining problems.",
        },
        {
          correct: false,
          label:
            "The class focused its revisions on the robotics display because it received the most visitors.",
        },
        {
          correct: false,
          label:
            "The rain showed that accessibility planning was mainly useful in dry weather.",
        },
        {
          correct: false,
          label:
            "The writer considered the first route adequate because it followed the shortest path.",
        },
      ],
    },
  },
  stimulus: "accessible-fair",
};

export default item;
