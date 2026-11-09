import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "explicit-information",
  },
  stimulus: "shipping-container",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Metal boxes could protect goods from theft and damage better than wooden crates.",
        },
        {
          correct: true,
          label:
            "The box, not the goods inside it, should be the unit every part of transport was built to handle.",
        },
        {
          correct: false,
          label:
            "Converted tankers could carry more cargo than purpose-built cargo ships of the time.",
        },
        {
          correct: false,
          label:
            "Trucks could replace ships on long routes such as the one between Newark and Houston.",
        },
        {
          correct: false,
          label:
            "Ports should hire more dockworkers so that ships could be loaded faster.",
        },
      ],
    },
  },
};

export default item;
