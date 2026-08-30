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
          label: "The center plans to remove all labels next week.",
        },
        {
          isCorrect: true,
          label: "New volunteers read the notebook before changing a zone.",
        },
        {
          isCorrect: false,
          label: "Nothing in the garden is ever adjusted.",
        },
        {
          isCorrect: false,
          label: "Failed experiments are kept secret from visitors.",
        },
        {
          isCorrect: false,
          label: "The roof railing supports every heavy planter.",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
