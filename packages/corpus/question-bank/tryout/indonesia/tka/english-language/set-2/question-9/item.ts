import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "comparison",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The writer decided that signs should only suit their designer.",
        },
        {
          isCorrect: false,
          label: "The writer concluded that delays always mean failure.",
        },
        {
          isCorrect: false,
          label: "The writer stopped recording remaining problems.",
        },
        {
          isCorrect: true,
          label:
            "The writer learned that a route must be tested by people with different needs.",
        },
        {
          isCorrect: false,
          label:
            "The writer believed symbols were less useful than hidden arrows.",
        },
      ],
    },
  },
  stimulusKey: "accessible-fair",
};

export default item;
