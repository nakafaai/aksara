import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "ant-foraging",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Walkers crossing a lawn compare two paths and choose the one with the better view, and soon everyone takes it.",
        },
        {
          correct: false,
          label:
            "A gardener measures two paths across a lawn and lines the shorter one with stones, and walkers follow the stones.",
        },
        {
          correct: true,
          label:
            "Walkers on the shorter of two paths across a lawn finish sooner and cross again sooner, so it wears bare first, and later walkers follow the bare path without measuring either.",
        },
        {
          correct: false,
          label:
            "Walkers who know the lawn well take the shorter path, and newcomers copy them once they have watched for a few days.",
        },
        {
          correct: false,
          label:
            "More walkers happen to start on the longer of two paths across a lawn, so it wears bare first, and later walkers follow the bare path.",
        },
      ],
    },
  },
};

export default item;
