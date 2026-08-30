import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "One speaker used more words than everyone else.",
        },
        {
          isCorrect: false,
          label: "No participant was allowed to revise an opinion.",
        },
        {
          isCorrect: false,
          label: "The fastest response was accepted without evidence.",
        },
        {
          isCorrect: true,
          label:
            "Restatements were accurate, evidence supported claims, and invitations respected choice.",
        },
        {
          isCorrect: false,
          label: "Only confident speakers received the question in advance.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
