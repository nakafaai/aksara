import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "analytical-exposition",
    topic: "main-idea-purpose",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "To ban replacement under every condition",
        },
        {
          isCorrect: false,
          label: "To remove safety from maintenance decisions",
        },
        {
          isCorrect: false,
          label: "To claim repair is always cheaper and greener",
        },
        {
          isCorrect: true,
          label:
            "To argue for a documented repair check that still permits justified replacement",
        },
        {
          isCorrect: false,
          label: "To keep unsupported equipment in service",
        },
      ],
    },
  },
  stimulusKey: "repair-first",
};

export default item;
