import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "boardwalk",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It is flooded more often, so it collects more salt than the low marsh.",
        },
        {
          correct: true,
          label:
            "It is flooded far less often, yet in dry months its salt pans can be saltier than the sea.",
        },
        {
          correct: false,
          label:
            "It is flooded less often, so it always holds less salt than the low marsh.",
        },
        {
          correct: false,
          label:
            "It is waterlogged and airless, while the low-marsh soil is dry and crusted with salt.",
        },
        {
          correct: false,
          label:
            "It is flooded by spring tides about twice a month, while the low marsh floods once a day.",
        },
      ],
    },
  },
};

export default item;
