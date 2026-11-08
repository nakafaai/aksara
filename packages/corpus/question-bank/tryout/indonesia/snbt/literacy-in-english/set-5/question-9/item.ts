import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "assumption",
  },
  stimulus: "basic-income",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Most basic income pilots last longer than ten years.",
        },
        {
          correct: false,
          label:
            "People who dislike their jobs never leave them, whatever their income.",
        },
        {
          correct: false,
          label:
            "Starting a business is always more useful than keeping a steady job.",
        },
        {
          correct: false,
          label:
            "Participants in pilots probably do not know when their payments will end.",
        },
        {
          correct: true,
          label:
            "People may act differently when they expect payments to last for life.",
        },
      ],
    },
  },
};

export default item;
