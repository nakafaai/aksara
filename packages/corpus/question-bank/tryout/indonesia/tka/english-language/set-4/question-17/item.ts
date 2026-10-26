import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "procedure",
    topic: "cause-effect",
  },
  stimulus: "pinhole-projector",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It will be larger and fainter than at a greater distance.",
        },
        {
          correct: true,
          label: "It will be smaller and brighter than at a greater distance.",
        },
        {
          correct: false,
          label:
            "It will not appear until the screen is at least one meter away.",
        },
        {
          correct: false,
          label: "It will show the edge of the Moon more clearly than before.",
        },
        {
          correct: false,
          label: "It will turn into a dark curve instead of a bright circle.",
        },
      ],
    },
  },
};

export default item;
