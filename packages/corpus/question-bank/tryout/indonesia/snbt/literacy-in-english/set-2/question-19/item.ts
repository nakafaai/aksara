import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "characterization",
  },
  stimulus: "market-scale",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "On the narrator's first morning, she tells her to watch Grandma's hands rather than the needle.",
        },
        {
          correct: false,
          label:
            "She says that the scale is not to be trusted, as the fish seller and the baker also say.",
        },
        {
          correct: true,
          label:
            "She knows that the inspector comes on Mondays, when the market is shut.",
        },
        {
          correct: false,
          label:
            "She is surprised to hear that the trick lies in a screw rather than in Grandma's hands.",
        },
        {
          correct: true,
          label:
            'She laughs, rather than looking troubled, when the narrator says, "It\'s the screw."',
        },
      ],
    },
  },
};

export default item;
