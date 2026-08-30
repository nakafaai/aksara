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
          label: "Every vendor removes all covers while rain is falling.",
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
          label: "No one records when the floor was checked.",
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
