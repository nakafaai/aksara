import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  stimulus: "library-boat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "A handrail beside the bench gives standing visitors a steady grip when the boat moves.",
        },
        {
          correct: false,
          label:
            "A river library is more accessible than a building library because it reaches several villages.",
        },
        {
          correct: false,
          label:
            "The crew should move the inspection tray away from the entrance during busy stops.",
        },
        {
          correct: false,
          label:
            "A stronger internet connection would make the boat's physical adaptations less important to users.",
        },
        {
          correct: false,
          label:
            "The cabin aisle is wide enough that an additional handrail would add little value.",
        },
      ],
    },
  },
};

export default item;
