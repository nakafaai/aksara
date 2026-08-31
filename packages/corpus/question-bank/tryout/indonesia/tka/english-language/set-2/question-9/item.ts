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
            "The writer learned that signs are adequate when their designer can explain them nearby.",
        },
        {
          isCorrect: false,
          label:
            "The writer treated the rainy-day delays as proof that the project had failed.",
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
