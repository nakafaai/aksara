import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "glacier-flow",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "The glacier has stopped moving and begun to flow backwards.",
        },
        {
          correct: true,
          label:
            "Ice still moves forward, but the snout melts faster than ice arrives.",
        },
        {
          correct: false,
          label:
            "More snow is now falling at the top of the glacier than before.",
        },
        {
          correct: false,
          label:
            "The ice in the middle now moves more slowly than the ice at the edges.",
        },
        {
          correct: false,
          label:
            "The glacier now gains more ice each year than it loses at the snout.",
        },
      ],
    },
  },
};

export default item;
