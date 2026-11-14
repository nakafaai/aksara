import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "analytical-exposition",
    topic: "synthesis",
  },
  stimulus: "bus-shelters",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "For about 125 million rupiah in total, the council could give eight of the fourteen stops a roof.",
        },
        {
          correct: false,
          label:
            "The roof at the market stop proved that roofs alone increase boardings.",
        },
        {
          correct: true,
          label:
            "Older passengers who now skip trips in the rain might travel more if the stops had roofs.",
        },
        {
          correct: false,
          label:
            "Every stop on the main route will have a shelter by the end of next year.",
        },
      ],
    },
  },
};

export default item;
