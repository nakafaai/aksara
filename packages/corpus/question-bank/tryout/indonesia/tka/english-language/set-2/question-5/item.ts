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
          isCorrect: false,
          label: "All river libraries are better than every building library.",
        },
        {
          isCorrect: false,
          label: "The crew should remove the inspection tray immediately.",
        },
        {
          isCorrect: true,
          label:
            "A handrail beside the bench gives standing visitors a steady grip when the boat moves.",
        },
        {
          isCorrect: false,
          label: "Internet access will certainly be perfect next year.",
        },
        {
          isCorrect: false,
          label: "No visitor has ever found the aisle narrow.",
        },
      ],
    },
  },
  stimulusKey: "library-boat",
};

export default item;
