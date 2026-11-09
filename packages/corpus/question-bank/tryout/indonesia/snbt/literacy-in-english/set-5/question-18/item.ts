import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "inference",
  },
  stimulus: "great-stink",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "It proved that the miasma theory of disease had been correct all along.",
        },
        {
          correct: false,
          label:
            "It was a failure, because cholera returned to London in 1866.",
        },
        {
          correct: false,
          label:
            "It came from John Snow's own design to stop diseases spread by water.",
        },
        {
          correct: true,
          label:
            "It reduced cholera even though the sewers were built for a mistaken reason.",
        },
        {
          correct: false,
          label: "It made the smell worse in the eastern parts of the city.",
        },
      ],
    },
  },
};

export default item;
