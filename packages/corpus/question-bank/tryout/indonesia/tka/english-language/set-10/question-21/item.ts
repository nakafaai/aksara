import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "analytical-exposition",
    topic: "fact-opinion",
  },
  stimulus: "bike-racks",
  versions: {
    en: {
      columns: [
        "Stated as a fact",
        "Stated as an opinion",
        "Not stated in either text",
      ],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label: "Cycling is simply the best start to a school day.",
        },
        {
          column: 1,
          label:
            "Fuel prices rose in the same term as SMA Harapan built its racks.",
        },
        {
          column: 3,
          label:
            "The rise in fuel prices caused the rise in cycling at SMA Harapan.",
        },
        {
          column: 1,
          label:
            "Nobody kept lateness figures at SMA Harapan for earlier years.",
        },
        {
          column: 2,
          label:
            "SMA Pelita's students should not be riding motorbikes at all.",
        },
        {
          column: 3,
          label: "Late arrivals at SMA Pelita fell last year.",
        },
      ],
    },
  },
};

export default item;
