import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "hotel-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It is the share of all the chain's guests who rated their stay good or excellent, and about six in seven of the answers came from Station.",
        },
        {
          correct: false,
          label:
            "It is the share of answers that rated the stay good or excellent, and the answers came about equally from the two hotels, so it reflects both hotels equally.",
        },
        {
          correct: true,
          label:
            "It is the share of answers that rated the stay good or excellent, and about six in seven of those answers came from Station, so it mostly reflects Station's guests.",
        },
        {
          correct: false,
          label:
            "It is the average of the two hotels' shares of good or excellent answers.",
        },
        {
          correct: false,
          label:
            "It is the share of answers that rated the stay good or excellent, and about three in five of the answers came from Station, matching its share of guests.",
        },
      ],
    },
  },
};

export default item;
