import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "vocabulary",
    topic: "word-meaning",
  },
  stimulus: "lontar",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "dicetak dengan tinta berwarna hitam",
        },
        {
          correct: true,
          label: "ditorehkan dengan ujung yang tajam",
        },
        {
          correct: false,
          label: "dilukis dengan kuas yang halus",
        },
        {
          correct: false,
          label: "ditempelkan dengan lem dari getah pohon",
        },
        {
          correct: false,
          label: "dijahit dengan benang berwarna",
        },
      ],
    },
  },
};

export default item;
