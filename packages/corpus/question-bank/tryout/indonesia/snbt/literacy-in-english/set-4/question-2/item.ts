import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "deep-vents",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It catches small animals that drift past in the current.",
        },
        {
          correct: false,
          label: "It produces the food that the worm's bacteria later digest.",
        },
        {
          correct: true,
          label:
            "It takes in the chemicals the bacteria need and passes them on.",
        },
        {
          correct: false,
          label: "It warns other animals that the worm's body is poisonous.",
        },
        {
          correct: false,
          label: "It allows the worm to swim between vents when one closes.",
        },
      ],
    },
  },
};

export default item;
