import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  stimulus: "rooftop-garden",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The container will stay cooler because a dark surface reflects more sunlight.",
        },
        {
          correct: false,
          label:
            "The rain gauge will become less accurate because the container color has changed.",
        },
        {
          correct: false,
          label:
            "The tomato frames will be more likely to pull loose from their heavy planters.",
        },
        {
          correct: true,
          label:
            "The stored water will probably warm more quickly, repeating the condition linked to the wilted lettuce.",
        },
        {
          correct: false,
          label:
            "The mesh will stop keeping leaves and insects out of the water.",
        },
      ],
    },
  },
};

export default item;
