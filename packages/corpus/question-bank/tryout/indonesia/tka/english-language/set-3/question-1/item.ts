import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Vendors uncover displays after rain so damp air can move across them.",
        },
        {
          isCorrect: true,
          label:
            "A staff member replaces any bridge whose surface becomes loose or slippery.",
        },
        {
          isCorrect: false,
          label: "The drain is hidden beneath a group of chairs.",
        },
        {
          isCorrect: false,
          label:
            "Staff replace bridges by visual judgment without recording the time of inspection.",
        },
        {
          isCorrect: false,
          label: "Paper prints are placed directly in the wet channel.",
        },
      ],
    },
  },
  stimulusKey: "rain-market",
};

export default item;
