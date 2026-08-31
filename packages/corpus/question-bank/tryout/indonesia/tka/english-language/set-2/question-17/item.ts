import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "outline",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Buy emergency equipment first, then add contacts after the first practice.",
        },
        {
          isCorrect: false,
          label:
            "Choose meeting places and rely on one shared phone for directions.",
        },
        {
          isCorrect: true,
          label:
            "Identify needs, choose places and a contact, record essentials, then practice and revise.",
        },
        {
          isCorrect: false,
          label:
            "Add detailed medical instructions to the out-of-area contact card.",
        },
        {
          isCorrect: false,
          label: "Invent a device backup before asking the provider.",
        },
      ],
    },
  },
  stimulusKey: "emergency-plan",
};

export default item;
