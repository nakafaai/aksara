import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "characterization",
  },
  stimulus: "night-orchard",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The thermometer by the post reads minus one at two in the morning.",
        },
        {
          correct: false,
          label:
            "The water rises in thin arcs over the trees when the valve is turned.",
        },
        {
          correct: true,
          label:
            "He makes her say back why the valve stays open until the ice has run off.",
        },
        {
          correct: false,
          label: "The Hallers' trees across the road stand bare in May.",
        },
        {
          correct: true,
          label:
            "He leaves a list of the steps, in his own handwriting, in the pocket of the green coat.",
        },
      ],
    },
  },
};

export default item;
