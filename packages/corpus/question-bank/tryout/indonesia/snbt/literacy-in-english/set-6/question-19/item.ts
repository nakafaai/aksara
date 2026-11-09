import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "railway-time",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To show that American newspapers opposed the railways' new time zones",
        },
        {
          correct: false,
          label:
            "To explain why the government waited until 1918 to pass a law on time",
        },
        {
          correct: true,
          label:
            "To make vivid how resetting clocks to a zone could repeat a familiar moment",
        },
        {
          correct: false,
          label:
            "To prove that every single American town saw noon twice on that particular day",
        },
        {
          correct: false,
          label: "To show that the sun appeared twice over some American towns",
        },
      ],
    },
  },
};

export default item;
