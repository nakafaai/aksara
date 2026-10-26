import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "cause-effect",
  },
  stimulus: "library-boat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "The usual river access changes when the water level falls.",
        },
        {
          correct: false,
          label:
            "To attract readers back after a fixed village library reduced its opening hours",
        },
        {
          correct: false,
          label: "The crew wants a stronger internet signal.",
        },
        {
          correct: false,
          label: "The folding ramp is stored in that village.",
        },
        {
          correct: false,
          label: "The boat's blue roof becomes too hot.",
        },
      ],
    },
  },
};

export default item;
