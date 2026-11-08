import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "slime-mould",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "It would grow thicker to attract more food towards it.",
        },
        {
          correct: true,
          label: "It would shrink and eventually disappear from the network.",
        },
        {
          correct: false,
          label: "It would turn into a trail of slime that marks the route.",
        },
        {
          correct: false,
          label:
            "It would stay the same size as the other tubes in the network.",
        },
        {
          correct: false,
          label: "It might split into several new tubes that search for food.",
        },
      ],
    },
  },
};

export default item;
