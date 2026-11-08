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
          label: "show that tardigrades are closely related to these animals.",
        },
        {
          correct: false,
          label: "argue that trehalose is harmful to tardigrades.",
        },
        {
          correct: false,
          label:
            "prove that all drought-tolerant animals survive in the same way.",
        },
        {
          correct: false,
          label: "explain why brine shrimp can survive in outer space.",
        },
        {
          correct: true,
          label:
            "contrast the sugar-based protection of other drought-tolerant animals with the different molecules many tardigrades seem to rely on.",
        },
      ],
    },
  },
};

export default item;
