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
            "Metal boxes could protect goods from theft better than wooden crates.",
        },
        {
          correct: true,
          label:
            "The container, not the goods inside it, should be the unit that every part of the transport chain was built to handle.",
        },
        {
          correct: false,
          label:
            "Converted tankers could carry more cargo than purpose-built cargo ships.",
        },
        {
          correct: false,
          label:
            "Trucks could replace ships on routes between Newark and Houston.",
        },
        {
          correct: false,
          label: "Ports should hire more dockworkers to load ships faster.",
        },
      ],
    },
  },
};

export default item;
