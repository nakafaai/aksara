import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  stimulus: "emergency-plan",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Buy emergency equipment first, then add contacts after the first practice.",
        },
        {
          correct: false,
          label:
            "Choose meeting places and rely on one shared phone for directions.",
        },
        {
          correct: true,
          label:
            "Identify needs, choose places and a contact, record essentials, then practice and revise.",
        },
        {
          correct: false,
          label:
            "Add detailed medical instructions to the out-of-area contact card.",
        },
        {
          correct: false,
          label: "Invent a device backup before asking the provider.",
        },
      ],
    },
  },
};

export default item;
