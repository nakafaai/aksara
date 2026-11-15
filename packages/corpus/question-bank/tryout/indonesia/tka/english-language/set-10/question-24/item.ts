import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "bike-racks",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Too many students ride motorbikes without a licence.",
        },
        {
          correct: false,
          label: "The racks caused the rise in cycling at SMA Harapan.",
        },
        {
          correct: true,
          label:
            "The number of students cycling to SMA Harapan rose by $$70$$.",
        },
        {
          correct: false,
          label: "SMA Pelita should close its motorbike park.",
        },
        {
          correct: false,
          label: "Late arrivals fell at SMA Harapan.",
        },
      ],
    },
  },
};

export default item;
