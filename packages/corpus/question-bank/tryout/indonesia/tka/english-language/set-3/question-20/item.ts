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
          label:
            "One speaker contributed most of the evidence and invited others only near the end.",
        },
        {
          isCorrect: false,
          label:
            "Participants retained their original positions after restating another view.",
        },
        {
          isCorrect: false,
          label: "The fastest response was accepted without evidence.",
        },
        {
          isCorrect: false,
          label:
            "The focused question was first given to participants who volunteered quickly.",
        },
        {
          isCorrect: true,
          label:
            "Restatements were accurate, evidence supported claims, and invitations respected choice.",
        },
      ],
    },
  },
  stimulusKey: "fair-discussion",
};

export default item;
