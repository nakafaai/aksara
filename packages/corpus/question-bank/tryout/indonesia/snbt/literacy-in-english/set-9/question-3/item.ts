import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "tambora-1816",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Ash clouds blocked the sun over Europe for the whole of 1816.",
        },
        {
          correct: false,
          label: "The eruption pushed cold ocean water towards North America.",
        },
        {
          correct: false,
          label: "Rain carried volcanic gas to Europe and turned it into snow.",
        },
        {
          correct: false,
          label:
            "The blast was so loud that it changed wind patterns around the whole world for months.",
        },
        {
          correct: true,
          label:
            "Sulphur droplets high in the atmosphere reflected part of the sunlight.",
        },
      ],
    },
  },
};

export default item;
