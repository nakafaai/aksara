import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "information-validity",
  },
  stimulus: "fair-discussion",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "One speaker contributed most of the evidence and invited others only near the end.",
        },
        {
          correct: false,
          label:
            "Participants retained their original positions after restating another view.",
        },
        {
          correct: false,
          label: "The fastest response was accepted without evidence.",
        },
        {
          correct: false,
          label:
            "The focused question was first given to participants who volunteered quickly.",
        },
        {
          correct: true,
          label:
            "Restatements were accurate, evidence supported claims, and invitations respected choice.",
        },
      ],
    },
  },
};

export default item;
