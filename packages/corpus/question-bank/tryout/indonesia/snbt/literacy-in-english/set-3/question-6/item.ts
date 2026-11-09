import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-idea",
  },
  stimulus: "four-day-week",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The four-day week has failed in most of the companies that have tried it.",
        },
        {
          correct: true,
          label:
            "Further trials are worthwhile, but current evidence does not justify a law for everyone.",
        },
        {
          correct: false,
          label:
            "Governments should require every employer to adopt a four-day week as soon as possible.",
        },
        {
          correct: false,
          label:
            "Compressed weeks are better than reduced weeks because pay stays the same.",
        },
        {
          correct: false,
          label:
            "Workers in hospitals and care homes should be the first to receive a four-day week.",
        },
      ],
    },
  },
};

export default item;
