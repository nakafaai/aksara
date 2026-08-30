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
          isCorrect: true,
          label:
            "Identify needs, choose places and a contact, record essentials, then practice and revise.",
        },
        {
          isCorrect: false,
          label: "Buy equipment, hide all cards, and avoid practice.",
        },
        {
          isCorrect: false,
          label: "Use one phone map and remove every paper copy.",
        },
        {
          isCorrect: false,
          label: "Share all private medical details with any contact.",
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
