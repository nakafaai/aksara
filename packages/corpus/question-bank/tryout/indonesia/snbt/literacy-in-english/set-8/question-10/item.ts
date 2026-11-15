import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "text-relation",
  },
  stimulus: "congestion-charge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Text B accepts Text A's figure for all cars but disputes what it shows about private cars.",
        },
        {
          correct: false,
          label: "Text B argues that the charge should be scrapped.",
        },
        {
          correct: true,
          label:
            "Text A's $$18\\%$$ includes ride-hailing cars, which pay no charge.",
        },
        {
          correct: true,
          label:
            "Text B links the fall in average speeds to ride-hailing cars driving empty between passengers.",
        },
        {
          correct: false,
          label:
            "Text A says that buses are still running faster than before the charge.",
        },
      ],
    },
  },
};

export default item;
