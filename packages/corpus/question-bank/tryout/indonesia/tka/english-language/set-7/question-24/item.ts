import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "market-street",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Jalan Pasar is too crowded on Sunday mornings.",
        },
        {
          correct: false,
          label: "The rise in Kota Lama's takings was caused by the closure.",
        },
        {
          correct: true,
          label:
            "Kota Lama's average number of shoppers rose by $$30\\%$$ during the trial.",
        },
        {
          correct: false,
          label:
            "A trial should compare its figures with the same Sundays of the year before.",
        },
        {
          correct: false,
          label: "Ambulances must be able to reach the clinic on Jalan Pasar.",
        },
      ],
    },
  },
};

export default item;
