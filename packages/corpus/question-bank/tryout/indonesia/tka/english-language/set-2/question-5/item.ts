import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "descriptive",
    topic: "text-fit",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "A handrail beside the bench gives standing visitors a steady grip when the boat moves.",
        },
        {
          isCorrect: false,
          label:
            "A river library is more accessible than a building library because it reaches several villages.",
        },
        {
          isCorrect: false,
          label:
            "The crew should move the inspection tray away from the entrance during busy stops.",
        },
        {
          isCorrect: false,
          label:
            "A stronger internet connection would make the boat's physical adaptations less important to users.",
        },
        {
          isCorrect: false,
          label:
            "The cabin aisle is wide enough that an additional handrail would add little value.",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
