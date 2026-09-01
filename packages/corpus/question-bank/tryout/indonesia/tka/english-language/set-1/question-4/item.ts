import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The container will stay cooler because a dark surface reflects more sunlight.",
        },
        {
          isCorrect: false,
          label:
            "The rain gauge will become less accurate because the container color has changed.",
        },
        {
          isCorrect: false,
          label:
            "The tomato frames will be more likely to pull loose from their heavy planters.",
        },
        {
          isCorrect: true,
          label:
            "The stored water will probably warm more quickly, repeating the condition linked to the wilted lettuce.",
        },
        {
          isCorrect: false,
          label:
            "The mesh will stop keeping leaves and insects out of the water.",
        },
      ],
    },
  },
  stimulusKey: "rooftop-garden",
};

export default item;
