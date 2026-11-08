import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "tardigrade-survival",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "show that tardigrades are closely related to these two kinds of animals.",
        },
        {
          correct: false,
          label:
            "argue that trehalose is harmful to tardigrades when their cells dry out.",
        },
        {
          correct: false,
          label:
            "prove that all drought-tolerant animals survive drying in exactly the same way.",
        },
        {
          correct: false,
          label:
            "explain why brine shrimp can survive in outer space as tardigrades do.",
        },
        {
          correct: true,
          label:
            "contrast the sugar used by other animals with the molecules tardigrades rely on.",
        },
      ],
    },
  },
};

export default item;
