import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "nuclear-power",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "New nuclear plants generate power more cheaply than new wind and solar.",
        },
        {
          correct: true,
          label:
            "The source that is cheapest when plants are compared one by one is not necessarily the cheapest for the grid as a whole.",
        },
        {
          correct: false,
          label:
            "Storage costs will fall fast enough to make steady sources of power unnecessary.",
        },
        {
          correct: false,
          label:
            "A grid powered entirely by steady sources would need no spare capacity at all.",
        },
        {
          correct: true,
          label:
            "The extra cost of covering weather-dependent power rises faster than the share of power that wind and sun supply.",
        },
      ],
    },
  },
};

export default item;
