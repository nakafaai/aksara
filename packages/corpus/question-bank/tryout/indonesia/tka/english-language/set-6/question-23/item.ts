import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "walking-bus",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "SD Lereng Asri's walking bus ended its traffic problem completely.",
        },
        {
          correct: true,
          label:
            "A walking bus could reduce the number of vehicles at SD Taman Kenari's gate, as it did at SD Lereng Asri.",
        },
        {
          correct: true,
          label:
            "Children who are now dropped off by motorbike or car could get half of the recommended daily activity by joining a walking bus.",
        },
        {
          correct: false,
          label: "A walking bus must run every day of the year to be useful.",
        },
      ],
    },
  },
};

export default item;
