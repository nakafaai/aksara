import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "sequence",
  },
  stimulus: "bike-tire",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "pumping a little air into the tube and holding it under water",
        },
        { correct: false, label: "removing the wheel from the frame" },
        {
          correct: false,
          label: "rubbing the area around the hole with sandpaper",
        },
        {
          correct: true,
          label:
            "checking the inside of the tire for a thorn or a piece of glass",
        },
        { correct: false, label: "turning the bicycle upside down" },
      ],
    },
  },
};

export default item;
